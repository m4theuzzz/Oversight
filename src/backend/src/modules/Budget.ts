
import { BudgetEntity, BudgetFilters, BudgetFiltersProps, BudgetProperties, BudgetProps, BudgetUpdate, processBudget } from "../types/BudgetTypes";
import { APIResponseProperties, Filters } from "../types/MiscTypes";
import { APIResponse } from "./utils/APIResponse";
import { Database } from "./utils/Database";
import { BadRequestException, NotFoundException } from "./utils/Exception";
import { Security } from "./utils/Security";
import { UUID } from "./utils/UUID";
import { Utils } from "./utils/Utils";

export class Budget {
    public static async getAll(companyId: UUID, filters?: Filters): Promise<APIResponseProperties> {
        const limit = filters?.pageSize ?? 20;
        const offset = ((filters?.page ?? 1) - 1) * limit;
        let query = `SELECT *, count(1) OVER() as totalLength FROM Budgets WHERE companyId='${companyId}'`
        filters?.pageSize ? delete filters.pageSize : null;
        filters?.page ? delete filters.page : null;

        if (Object.keys(filters).length) {
            const budgetFilters = Utils.filterObject<(keyof BudgetFilters)[], BudgetFilters>(filters, BudgetFiltersProps);
            query += Database.buildFilters(budgetFilters, Object.keys(filters) as (keyof BudgetFilters)[]);
        }

        query += ` LIMIT ${limit} OFFSET ${offset}`;

        const result = await Database.client.query(query);

        const budgets = result.rows.map(budget => processBudget(budget)).map(budget => {
            delete budget.companyId;
            return budget;
        });
        const totalLength = result.rows[result.rows.length - 1]?.totallength ?? 0;

        return APIResponse.buildList(budgets, totalLength, filters?.page, filters?.pageSize)
    }

    public static async getById(companyId: UUID, id: UUID): Promise<BudgetEntity> {
        const result = await Database.client.query(
            `SELECT * FROM Budgets WHERE companyId='${companyId}' AND id='${id}'`
        );

        if (result.rows.length == 0) {
            throw new NotFoundException("Budget not found.");
        }

        return result.rows.map(budget => processBudget(budget)).map(budget => {
            delete budget.companyId;
            return budget;
        })[0];
    }

    public static async insert(companyId: UUID, userId: UUID, budget: BudgetProperties) {
        if (!Utils.isType(budget, BudgetProps)) {
            throw new BadRequestException("Missing important properties.");
        }

        const safeUser = Security.escapeObject(budget);

        const result = await Database.client.query(
            `INSERT INTO Budgets (
                companyId,
                customerId,
                name,
                description,
                incomingMargin,
                status,
                createdBy
            ) VALUES (
                '${companyId}',
                '${safeUser.customerId}',
                '${safeUser.name}',
                '${safeUser.description}',
                '${safeUser.incomingMargin}',
                '${safeUser.status}',
                '${userId}'
            ) RETURNING id, companyId, customerId, name, description, incomingMargin, status, createdBy, createdAt, updatedAt`
        );

        return result.rows.map(i => processBudget(i)).map(i => { delete i.companyId; return i; })[0];
    }

    public static async update(companyId: UUID, budgetId: UUID, budget: BudgetUpdate) {
        const updObj = Utils.filterObject<(keyof BudgetProperties)[], BudgetUpdate>(budget, BudgetProps);

        if (Object.keys(updObj).length == 0) {
            throw new BadRequestException("Missing important properties.");
        }

        await this.budgetExists(companyId, budgetId);

        const safeBudget = Security.escapeObject(updObj);

        const updStr = Utils.buildUpdateString(safeBudget);

        const result = await Database.client.query(
            `UPDATE Budgets SET ${updStr} WHERE companyId='${companyId}' AND id='${budgetId}'
            RETURNING id, companyId, name, description, incomingMargin, status, createdBy, createdAt, updatedAt`
        );

        return result.rows.map(i => processBudget(i)).map(i => { delete i.companyId; return i; })[0];
    }

    public static async delete(companyId: UUID, budgetId: UUID) {
        await this.budgetExists(companyId, budgetId);

        await Database.client.query(
            `DELETE FROM Budgets WHERE companyId='${companyId}' AND id='${budgetId}'`
        );
        return budgetId;
    }

    public static async budgetExists(companyId: UUID, userId: UUID) { return await Budget.getById(companyId, userId) }
}
