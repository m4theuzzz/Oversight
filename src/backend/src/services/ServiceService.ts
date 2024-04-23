import { Service } from "../modules/Service";
import { APIResponse } from "../modules/utils/APIResponse";
import { NotFoundException, UnexpectedException } from "../modules/utils/Exception";
import { UUID } from "../modules/utils/UUID";
import { APIResponseProperties, Filters } from "../types/MiscTypes";
import { ServiceProperties, ServiceUpdate } from "../types/ServiceTypes";

export class ServiceService {
    public static async getAll(companyId: UUID, filters?: Filters): Promise<APIResponseProperties> {
        return await Service.getAll(companyId, filters);
    }

    public static async getById(companyId: UUID, serviceId: UUID): Promise<APIResponseProperties> {
        try {
            const service = await Service.getById(companyId, serviceId);
            return APIResponse.build(service)
        } catch (error) {
            if (error.status) {
                throw error;
            } else {
                console.log(error);
                throw new NotFoundException("Service not found.");
            }
        }
    }

    public static async post(companyId: UUID, userId: UUID, serviceData: ServiceProperties): Promise<APIResponseProperties> {
        try {
            const service = await Service.insert(companyId, userId, serviceData);
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

    public static async put(companyId: UUID, serviceId: UUID, serviceData: ServiceUpdate): Promise<APIResponseProperties> {
        try {
            const service = await Service.update(companyId, serviceId, serviceData);
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
            await Service.delete(companyId, serviceId);
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
