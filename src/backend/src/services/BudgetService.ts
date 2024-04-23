import { Budget } from "../modules/Budget";
import { APIResponse } from "../modules/utils/APIResponse";
import { NotFoundException, UnexpectedException } from "../modules/utils/Exception";
import { UUID } from "../modules/utils/UUID";
import { APIResponseProperties, Filters } from "../types/MiscTypes";
import { BudgetProperties, BudgetUpdate } from "../types/BudgetTypes";

export class BudgetService {
    public static async getAll(companyId: UUID, filters?: Filters): Promise<APIResponseProperties> {
        return await Budget.getAll(companyId, filters);
    }

    public static async getById(companyId: UUID, serviceId: UUID): Promise<APIResponseProperties> {
        try {
            const service = await Budget.getById(companyId, serviceId);
            return APIResponse.build(service)
        } catch (error) {
            if (error.status) {
                throw error;
            } else {
                console.log(error);
                throw new NotFoundException("Budget not found.");
            }
        }
    }

    public static async post(companyId: UUID, userId: UUID, serviceData: BudgetProperties): Promise<APIResponseProperties> {
        try {
            const service = await Budget.insert(companyId, userId, serviceData);
            return APIResponse.build(service)
        } catch (error) {
            if (error.status) {
                throw error;
            } else {
                console.log(error);
                throw new UnexpectedException("Couldn't create a new service, try again later.");
            }
        }
    }

    public static async put(companyId: UUID, serviceId: UUID, serviceData: BudgetUpdate): Promise<APIResponseProperties> {
        try {
            const service = await Budget.update(companyId, serviceId, serviceData);
            return APIResponse.build(service)
        } catch (error) {
            if (error.status) {
                throw error;
            } else {
                console.log(error);
                throw new UnexpectedException("Couldn't update the service, try again later.");
            }
        }
    }

    public static async delete(companyId: UUID, serviceId: UUID): Promise<UUID> {
        try {
            await Budget.delete(companyId, serviceId);
            return serviceId;
        } catch (error) {
            if (error.status) {
                throw error;
            } else {
                console.log(error);
                throw new UnexpectedException("Couldn't delete the service, try again later.");
            }
        }
    }
}
