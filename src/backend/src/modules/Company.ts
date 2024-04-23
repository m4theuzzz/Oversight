import { CompanyEntity, CompanyFilterProps, CompanyFilters, CompanyProperties, CompanyProps, CompanyUpdate, processCompany } from "../types/CompanyTypes";
import { APIResponseProperties, Filters } from "../types/MiscTypes";
import { APIResponse } from "./utils/APIResponse";
import { Database } from "./utils/Database";
import { BadRequestException } from "./utils/Exception";
import { Security } from "./utils/Security";
import { UUID } from "./utils/UUID";
import { Utils } from "./utils/Utils";

export class Company {
    public static async getAll(filters?: Filters): Promise<APIResponseProperties> {
        const limit = filters?.pageSize ?? 20;
        const offset = ((filters?.page ?? 1) - 1) * limit;
        let query = `SELECT *, count(1) OVER() as totalLength FROM Companies`
        filters?.pageSize ? delete filters.pageSize : null;
        filters?.page ? delete filters.page : null;

        if (Object.keys(filters).length) {
            const companyFilters = Utils.filterObject<(keyof CompanyFilters)[], CompanyFilters>(filters, CompanyFilterProps);
            query += Database.buildFilters(companyFilters, Object.keys(filters) as (keyof CompanyFilters)[]);
        }

        query += ` LIMIT ${limit} OFFSET ${offset}`;

        const result = await Database.client.query(query);

        const totalLength = result.rows[result.rows.length - 1]?.totallength ?? 0;
        const companies = result.rows.map(company => processCompany(company)).map(company => { delete company.emailPass; return company; });
        return APIResponse.buildList(companies, totalLength, filters?.page, filters?.pageSize)
    }

    public static async getById(companyId: UUID): Promise<CompanyEntity> {
        const result = await Database.client.query(
            `SELECT * FROM Companies WHERE id='${companyId}'`
        );
        return result.rows.map(company => processCompany(company))[0];
    }

    public static async insert(company: CompanyProperties): Promise<CompanyEntity> {
        if (!Utils.isType(company, CompanyProps)) {
            throw new BadRequestException("Missing important properties.");
        }

        const safeCompany = Security.escapeObject(company);

        const result = await Database.client.query(
            `INSERT INTO Companies (name, email, cnpj, phone) VALUES (
                '${safeCompany.name}',
                '${safeCompany.email}',
                '${safeCompany.cnpj}',
                '${safeCompany.phone}'
            ) RETURNING id, name, email, cnpj, phone`
        );

        return result.rows.map(i => processCompany(i))[0]

    }

    public static async update(companyId: UUID, company: CompanyUpdate): Promise<CompanyEntity> {
        const updObj = Utils.filterObject<(keyof CompanyProperties)[], CompanyUpdate>(company, CompanyProps);

        if (Object.keys(updObj).length == 0) {
            throw new BadRequestException("Missing important properties.");
        }

        const safeCompany = Security.escapeObject(updObj);

        const updStr = Utils.buildUpdateString(safeCompany);

        const result = await Database.client.query(
            `UPDATE Companies SET ${updStr} WHERE id='${companyId}'
            RETURNING id, name, email, cnpj, phone`
        );

        return result.rows.map(i => processCompany(i))[0];
    }

    public static async delete(companyId: UUID): Promise<UUID> {
        await Database.client.query(
            `DELETE FROM Companies WHERE id='${companyId}'`
        );
        return companyId;
    }
}
