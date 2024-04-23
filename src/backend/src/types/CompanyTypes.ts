import { UUID } from "../modules/utils/UUID"
import { Filters } from "./MiscTypes"

interface CompanyProperties {
    name: string,
    email: string,
    cnpj: number,
    phone: number
}

interface CompanyUpdate {
    name?: string,
    email?: string,
    cnpj?: number,
    phone?: number
}

interface CompanyEntity extends CompanyProperties {
    id: UUID,
    emailPass?: string,
    createdAt: Date,
    updatedAt: Date
}

interface CompanyData extends CompanyProperties {
    id: UUID,
    emailpass?: string,
    createdat: Date,
    updatedat: Date
}

const processCompany = (data: CompanyData): CompanyEntity => ({
    id: data.id,
    name: data.name,
    email: data.email,
    emailPass: data.emailpass,
    cnpj: data.cnpj,
    phone: data.phone,
    createdAt: data.createdat,
    updatedAt: data.updatedat,
});

const CompanyProps: (keyof CompanyProperties)[] = ["name", "email", "cnpj", "phone"];

interface CompanyFilters extends Filters {
    name?: String,
    email?: String,
    cnpj?: number
}

const CompanyFilterProps: (keyof CompanyFilters)[] = ["name", "email", "cnpj"];

export {
    CompanyProperties,
    CompanyUpdate,
    CompanyData,
    CompanyEntity,
    CompanyProps,
    processCompany,
    CompanyFilters,
    CompanyFilterProps
}
