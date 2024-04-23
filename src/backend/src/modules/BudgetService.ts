
import { BudgetServiceEntity, BudgetServiceProperties, BudgetServiceProps, BudgetServiceUpdate, enrichBudgetServices, processBudgetService } from "../types/BudgetServiceTypes";
import { APIResponseProperties, Filters } from "../types/MiscTypes";
import { APIResponse } from "./utils/APIResponse";
import { Database } from "./utils/Database";
import { BadRequestException, NotFoundException } from "./utils/Exception";
import { Security } from "./utils/Security";
import { UUID } from "./utils/UUID";
import { Utils } from "./utils/Utils";

export class BudgetService {
    public static async getAll(companyId: UUID, budgetId: UUID, filters?: Filters): Promise<APIResponseProperties> {
        const limit = filters?.pageSize ?? 20;
        const offset = ((filters?.page ?? 1) - 1) * limit;

        const result = await Database.client.query(
            `SELECT *, count(1) OVER() as totalLength FROM BudgetServices WHERE budgetId='${budgetId}' LIMIT ${limit} OFFSET ${offset}`
        );

        const budgetServices = result.rows.map(budgetService => processBudgetService(budgetService));
        const enrichedBudgetServicesPromises = budgetServices.map(async (budgetService) => await enrichBudgetServices(companyId, budgetService));
        const enrichedBudgetServices = await Promise.all(enrichedBudgetServicesPromises);
        const totalLength = result.rows[result.rows.length - 1]?.totallength ?? 0;

        return APIResponse.buildList(enrichedBudgetServices, totalLength, filters?.page, filters?.pageSize)
    }

    public static async getById(budgetId: UUID, serviceId: UUID): Promise<BudgetServiceEntity> {
        const result = await Database.client.query(
            `SELECT * FROM BudgetServices WHERE budgetId='${budgetId}' AND serviceId='${serviceId}'`
        );

        if (result.rows.length == 0) {
            throw new NotFoundException("BudgetService not found.");
        }

        return result.rows.map(budgetService => processBudgetService(budgetService))[0];
    }

    public static async insert(budgetId: UUID, userId: UUID, budgetService: BudgetServiceProperties) {
        if (!Utils.isType(budgetService, BudgetServiceProps)) {
            throw new BadRequestException("Missing important properties.");
        }

        const safeUser = Security.escapeObject(budgetService);

        const result = await Database.client.query(
            `INSERT INTO BudgetServices (
                budgetId,
                serviceId,
                quantity,
                budgetedUnitValue,
                createdBy
            ) VALUES (
                '${budgetId}',
                '${safeUser.serviceId}',
                '${safeUser.quantity}',
                '${safeUser.budgetedUnitValue}',
                '${userId}'
            ) RETURNING budgetId, serviceId, quantity, budgetedUnitValue, createdBy, createdAt, updatedAt`
        );

        return result.rows.map(i => processBudgetService(i))[0];
    }

    public static async update(budgetId: UUID, budgetServiceId: UUID, budgetService: BudgetServiceUpdate) {
        const updObj = Utils.filterObject<(keyof BudgetServiceProperties)[], BudgetServiceUpdate>(budgetService, BudgetServiceProps);

        if (Object.keys(updObj).length == 0) {
            throw new BadRequestException("Missing important properties.");
        }

        await this.budgetServiceExists(budgetId, budgetServiceId);

        const safeBudgetService = Security.escapeObject(updObj);

        const updStr = Utils.buildUpdateString(safeBudgetService);

        const result = await Database.client.query(
            `UPDATE BudgetServices SET ${updStr} WHERE budgetId='${budgetId}' AND serviceId='${budgetServiceId}'
            RETURNING budgetId, serviceId, quantity, budgetedUnitValue, createdBy, createdAt, updatedAt`
        );

        return result.rows.map(i => processBudgetService(i))[0];
    }

    public static async delete(budgetId: UUID, budgetServiceId: UUID) {
        await this.budgetServiceExists(budgetId, budgetServiceId);

        await Database.client.query(
            `DELETE FROM BudgetServices WHERE budgetId='${budgetId}' AND serviceId='${budgetServiceId}'`
        );
        return budgetServiceId;
    }

    public static async budgetServiceExists(budgetId: UUID, userId: UUID) { return await BudgetService.getById(budgetId, userId) }
}
