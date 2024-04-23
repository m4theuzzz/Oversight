import { UUID } from "../modules/utils/UUID";

interface AddressProperties {
    cep: number,
    street: string,
    number: number,
    complement: string,
}

interface AddressUpdate {
    cep?: number,
    street?: string,
    number?: number,
    complement?: string,
}

interface AddressData extends AddressProperties {
    customerid: UUID,
    createdat: Date,
    updatedat: Date
}
interface AddressEntity extends AddressProperties {
    customerId: UUID,
    createdAt: Date,
    updatedAt: Date
}

const AddressProps: (keyof AddressProperties)[] = ["cep", "street", "number", "complement"];

const processAddress = (data: AddressData): AddressEntity => ({
    customerId: data.customerid,
    cep: data.cep,
    street: data.street,
    number: data.number,
    complement: data.complement,
    createdAt: data.createdat,
    updatedAt: data.updatedat
});

export {
    AddressProperties,
    AddressUpdate,
    AddressData,
    AddressEntity,
    AddressProps,
    processAddress
}
