import { UUID } from "../modules/utils/UUID"
import { AddressProperties, AddressUpdate } from "./AddressTypes"
import { Filters } from "./MiscTypes";

interface CustomerProperties {
    email: string,
    name: string,
    phone: number | null,
}

interface CustomerUpdate {
    email?: string,
    name?: string,
    phone?: number,
}

interface CustomerData extends CustomerProperties {
    id: UUID,
    companyid: UUID,
    createdby: UUID,
    createdat: Date,
    updatedat: Date
}

interface CustomerEntity extends CustomerProperties {
    id: UUID,
    address?: AddressProperties,
    createdBy: UUID,
    companyId: UUID,
    createdAt: Date,
    updatedAt: Date
}

const processCustomer = (data: CustomerData): CustomerEntity => ({
    id: data.id,
    email: data.email,
    name: data.name,
    phone: data.phone,
    createdBy: data.createdby,
    companyId: data.companyid,
    createdAt: data.createdat,
    updatedAt: data.updatedat
});

const CustomerProps: (keyof CustomerProperties)[] = ["email", "name", "phone"]

interface CustomerFilters extends Filters {
    email?: String,
    name?: String,
    phone?: String,
    address?: String,
}

const CustomerFiltersProps: (keyof CustomerFilters)[] = ["email", "name", "phone", "address"]

export {
    CustomerProperties,
    CustomerUpdate,
    CustomerData,
    CustomerEntity,
    CustomerProps,
    processCustomer,
    CustomerFilters,
    CustomerFiltersProps
}
