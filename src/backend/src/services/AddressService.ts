import { Address } from "../modules/Address";
import { APIResponse } from "../modules/utils/APIResponse";
import { NotFoundException, UnexpectedException } from "../modules/utils/Exception";
import { UUID } from "../modules/utils/UUID";
import { APIResponseProperties } from "../types/MiscTypes";
import { AddressProperties, AddressUpdate } from "../types/AddressTypes";

export class AddressService {
    public static async getByCustomerId(customerId: UUID): Promise<APIResponseProperties> {
        try {
            const address = await Address.getByCustomerId(customerId);
            return APIResponse.build(address)
        } catch (error) {
            if (error.status) {
                throw error;
            } else {
                console.log(error);
                throw new NotFoundException("Address not found.");
            }
        }
    }

    public static async post(customerId: UUID, addressData: AddressProperties): Promise<APIResponseProperties> {
        try {
            const customer = await Address.insert(customerId, addressData);
            return APIResponse.build(customer)
        } catch (error) {
            if (error.status) {
                throw error;
            } else {
                console.log(error);
                throw new UnexpectedException("Couldn't create a new address, try again later.");
            }
        }
    }

    public static async put(customerId: UUID, addressData: AddressUpdate): Promise<APIResponseProperties> {
        try {
            const customer = await Address.update(customerId, addressData);
            return APIResponse.build(customer)
        } catch (error) {
            if (error.status) {
                throw error;
            } else {
                console.log(error);
                throw new UnexpectedException("Couldn't update the address, try again later.");
            }
        }
    }
}
