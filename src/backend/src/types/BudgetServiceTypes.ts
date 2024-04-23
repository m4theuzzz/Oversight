import { Service } from "../modules/Service"
import { UUID } from "../modules/utils/UUID"
import { ServiceEntity } from "./ServiceTypes"

interface BudgetServiceProperties {
    serviceId: UUID,
    quantity: number,
    budgetedUnitValue: number
}

interface BudgetServiceUpdate {
    quantity?: number,
    budgetedUnitValue?: number
}

interface BudgetServiceData extends BudgetServiceProperties {
    budgetid: UUID,
    serviceid: UUID,
    budgetedunitvalue: number,
    createdby: UUID,
    createdat: Date,
    updatedat: Date
}

interface BudgetServiceEntity extends BudgetServiceProperties {
    budgetId: UUID,
    createdBy: UUID,
    createdAt: Date,
    updatedAt: Date
}

interface EnrichedBudgetService {
    budgetId: UUID,
    serviceId: UUID,
    service: ServiceEntity,
    quantity: number,
    budgetedUnitValue: number,
    createdBy: UUID,
    createdAt: Date,
    updatedAt: Date
}

const processBudgetService = (data: BudgetServiceData): BudgetServiceEntity => ({
    budgetId: data.budgetid,
    serviceId: data.serviceid,
    quantity: data.quantity,
    budgetedUnitValue: data.budgetedunitvalue,
    createdBy: data.createdby,
    createdAt: data.createdat,
    updatedAt: data.updatedat
});

const enrichBudgetServices = async (companyId: UUID, data: BudgetServiceEntity): Promise<EnrichedBudgetService> => {
    const service = await Service.getById(companyId, data.serviceId)
    return ({
        budgetId: data.budgetId,
        serviceId: data.serviceId,
        service: service,
        quantity: data.quantity,
        budgetedUnitValue: data.budgetedUnitValue,
        createdBy: data.createdBy,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
    })
};

const BudgetServiceProps: (keyof BudgetServiceProperties)[] = ["quantity", "budgetedUnitValue"]

export {
    BudgetServiceProperties,
    BudgetServiceUpdate,
    BudgetServiceData,
    BudgetServiceEntity,
    BudgetServiceProps,
    processBudgetService,
    enrichBudgetServices
}
