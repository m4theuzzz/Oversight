import { BudgetService } from "../modules/BudgetService";
import { APIResponse } from "../modules/utils/APIResponse";
import { NotFoundException, UnexpectedException } from "../modules/utils/Exception";
import { UUID } from "../modules/utils/UUID";
import { APIResponseProperties, Filters } from "../types/MiscTypes";
import { BudgetServiceProperties, BudgetServiceUpdate } from "../types/BudgetServiceTypes";

export class BudgetServiceService {
    public static async getAll(companyId: UUID, budgetId: UUID, filters?: Filters): Promise<APIResponseProperties> {
        return await BudgetService.getAll(companyId, budgetId, filters);
    }

    public static async getById(budgetId: UUID, budgetServiceId: UUID): Promise<APIResponseProperties> {
        try {
            const budgetService = await BudgetService.getById(budgetId, budgetServiceId);
            return APIResponse.build(budgetService)
        } catch (error) {
            if (error.status) {
                throw error;
            } else {
                console.log(error);
                throw new NotFoundException("BudgetService not found.");
            }
        }
    }

    public static async post(budgetId: UUID, userId: UUID, budgetServiceData: BudgetServiceProperties): Promise<APIResponseProperties> {
        try {
            const budgetService = await BudgetService.insert(budgetId, userId, budgetServiceData);
            return APIResponse.build(budgetService)
        } catch (error) {
            if (error.status) {
                throw error;
            } else {
                console.log(error);
                throw new UnexpectedException("Couldn't create a new budgetService, try again later.");
            }
        }
    }

    public static async put(budgetId: UUID, budgetServiceId: UUID, budgetServiceData: BudgetServiceUpdate): Promise<APIResponseProperties> {
        try {
            const budgetService = await BudgetService.update(budgetId, budgetServiceId, budgetServiceData);
            return APIResponse.build(budgetService)
        } catch (error) {
            if (error.status) {
                throw error;
            } else {
                console.log(error);
                throw new UnexpectedException("Couldn't update the budgetService, try again later.");
            }
        }
    }

    public static async delete(budgetId: UUID, budgetServiceId: UUID): Promise<UUID> {
        try {
            await BudgetService.delete(budgetId, budgetServiceId);
            return budgetServiceId;
        } catch (error) {
            if (error.status) {
                throw error;
            } else {
                console.log(error);
                throw new UnexpectedException("Couldn't delete the budgetService, try again later.");
            }
        }
    }
}
