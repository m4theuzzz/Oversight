import { UUID } from "../modules/utils/UUID"
import { Filters } from "./MiscTypes";

interface BudgetProperties {
    customerId: UUID,
    name: string,
    description: string | null,
    incomingMargin: number,
    status: BudgetStatus | null,
    statusMessage: string
}

interface BudgetUpdate {
    name?: string;
    description?: string;
    incomingMargin?: number,
    status?: BudgetStatus,
}

interface BudgetData extends BudgetProperties {
    id: UUID,
    companyid: UUID,
    customerid: UUID,
    incomingmargin: number,
    statusmessage: string,
    createdby: UUID,
    createdat: Date,
    updatedat: Date
}

interface BudgetEntity extends BudgetProperties {
    id: UUID,
    companyId: UUID,
    createdBy: UUID,
    createdAt: Date,
    updatedAt: Date
}

const processBudget = (data: BudgetData): BudgetEntity => ({
    id: data.id,
    name: data.name,
    description: data.description,
    incomingMargin: data.incomingmargin,
    status: data.status,
    statusMessage: data.statusmessage,
    createdBy: data.createdby,
    customerId: data.customerid,
    companyId: data.companyid,
    createdAt: data.createdat,
    updatedAt: data.updatedat
});

const BudgetProps: (keyof BudgetProperties)[] = ["name", "description", "incomingMargin", "status"]

enum BudgetStatus {
    BUDGETING = 'budgeting',
    AWAITING = 'awaiting',
    APPROVED = 'approved',
    EXECUTING = 'executing',
    DONE = 'done'
}

interface BudgetFilters extends Filters {
    name?: String,
    status?: BudgetStatus
}

const BudgetFiltersProps: (keyof BudgetFilters)[] = ["name", "status"]

export {
    BudgetProperties,
    BudgetUpdate,
    BudgetData,
    BudgetEntity,
    BudgetProps,
    processBudget,
    BudgetStatus,
    BudgetFilters,
    BudgetFiltersProps
}
