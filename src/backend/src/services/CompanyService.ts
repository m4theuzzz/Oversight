import { Company } from "../modules/Company";
import { APIResponse } from "../modules/utils/APIResponse";
import { NotFoundException, UnauthorizedException, UnexpectedException } from "../modules/utils/Exception";
import { UUID } from "../modules/utils/UUID";
import { APIResponseProperties, Filters } from "../types/MiscTypes";
import { CompanyProperties, CompanyUpdate } from "../types/CompanyTypes";

export class CompanyService {
    public static async getAll(filters?: Filters): Promise<APIResponseProperties> {
        return await Company.getAll(filters);
    }

    public static async getById(companyId: UUID): Promise<APIResponseProperties> {
        try {
            const company = await Company.getById(companyId);
            return APIResponse.build(company)
        } catch (error) {
            if (error.status) {
                throw error;
            } else {
                console.log(error);
                throw new NotFoundException("Company not found.");
            }
        }
    }

    public static async post(companyData: CompanyProperties): Promise<APIResponseProperties> {
        try {
            const company = await Company.insert(companyData);
            return APIResponse.build(company)
        } catch (error) {
            if (error.status) {
                throw error;
            } else {
                console.log(error);
                throw new UnexpectedException("Couldn't create a new company, try again later.");
            }
        }
    }

    public static async put(companyId: UUID, companyData: CompanyUpdate): Promise<APIResponseProperties> {
        try {
            const company = await Company.update(companyId, companyData);
            return APIResponse.build(company)
        } catch (error) {
            if (error.status) {
                throw error;
            } else {
                console.log(error);
                throw new UnexpectedException("Couldn't update the company, try again later.");
            }
        }
    }

    public static async delete(companyId: UUID): Promise<UUID> {
        try {
            await Company.delete(companyId);
            return companyId;
        } catch (error) {
            if (error.status) {
                throw error;
            } else {
                console.log(error);
                throw new UnexpectedException("Couldn't delete the company, try again later.");
            }
        }
    }
}
