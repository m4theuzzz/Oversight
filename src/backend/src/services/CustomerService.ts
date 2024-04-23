import { Customer } from "../modules/Customer";
import { APIResponse } from "../modules/utils/APIResponse";
import { NotFoundException, UnexpectedException } from "../modules/utils/Exception";
import { UUID } from "../modules/utils/UUID";
import { APIResponseProperties, Filters } from "../types/MiscTypes";
import { CustomerProperties, CustomerUpdate } from "../types/CustomerTypes";

export class CustomerService {
    public static async getAll(companyId: UUID, filters?: Filters): Promise<APIResponseProperties> {
        return await Customer.getAll(companyId, filters);
    }

    public static async getById(companyId: UUID, customerId: UUID): Promise<APIResponseProperties> {
        try {
            const customer = await Customer.getById(companyId, customerId);
            return APIResponse.build(customer)
        } catch (error) {
            if (error.status) {
                throw error;
            } else {
                console.log(error);
                throw new NotFoundException("Customer not found.");
            }
        }
    }

    public static async post(companyId: UUID, userId: UUID, customerData: CustomerProperties): Promise<APIResponseProperties> {
        try {
            const customer = await Customer.insert(companyId, userId, customerData);
            return APIResponse.build(customer)
        } catch (error) {
            if (error.status) {
                throw error;
            } else {
                console.log(error);
                throw new UnexpectedException("Couldn't create a new customer, try again later.");
            }
        }
    }

    public static async put(companyId: UUID, customerId: UUID, customerData: CustomerUpdate): Promise<APIResponseProperties> {
        try {
            const customer = await Customer.update(companyId, customerId, customerData);
            return APIResponse.build(customer)
        } catch (error) {
            if (error.status) {
                throw error;
            } else {
                console.log(error);
                throw new UnexpectedException("Couldn't update the customer, try again later.");
            }
        }
    }

    public static async delete(companyId: UUID, customerId: UUID): Promise<UUID> {
        try {
            await Customer.delete(companyId, customerId);
            return customerId;
        } catch (error) {
            if (error.status) {
                throw error;
            } else {
                console.log(error);
                throw new UnexpectedException("Couldn't delete the customer, try again later.");
            }
        }
    }
}
