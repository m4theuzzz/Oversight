
import { ServiceEntity, ServiceFilterProps, ServiceFilters, ServiceProperties, ServiceProps, ServiceUpdate, processService } from "../types/ServiceTypes";
import { APIResponseProperties, Filters } from "../types/MiscTypes";
import { APIResponse } from "./utils/APIResponse";
import { Database } from "./utils/Database";
import { BadRequestException, NotFoundException } from "./utils/Exception";
import { Security } from "./utils/Security";
import { UUID } from "./utils/UUID";
import { Utils } from "./utils/Utils";

export class Service {
    public static async getAll(companyId: UUID, filters?: Filters): Promise<APIResponseProperties> {
        const limit = filters?.pageSize ?? 20;
        const offset = ((filters?.page ?? 1) - 1) * limit;
        let query = `SELECT *, count(1) OVER() as totalLength FROM Services WHERE companyId='${companyId}'`;
        filters?.pageSize ? delete filters.pageSize : null;
        filters?.page ? delete filters.page : null;

        if (Object.keys(filters).length) {
            const serviceFilters = Utils.filterObject<(keyof ServiceFilters)[], ServiceFilters>(filters, ServiceFilterProps);
            query += Database.buildFilters(serviceFilters, Object.keys(filters) as (keyof ServiceFilters)[]);
        }

        query += ` LIMIT ${limit} OFFSET ${offset}`;

        const result = await Database.client.query(query);

        const services = result.rows.map(service => processService(service)).map(service => {
            delete service.companyId;
            return service;
        });
        const totalLength = result.rows[result.rows.length - 1]?.totallength ?? 0;

        return APIResponse.buildList(services, totalLength, filters?.page, filters?.pageSize)
    }

    public static async getById(companyId: UUID, id: UUID): Promise<ServiceEntity> {
        const result = await Database.client.query(
            `SELECT * FROM Services WHERE companyId='${companyId}' AND id='${id}'`
        );

        if (result.rows.length == 0) {
            throw new NotFoundException("Service not found.");
        }

        return result.rows.map(service => processService(service)).map(service => {
            delete service.companyId;
            return service;
        })[0];
    }

    public static async insert(companyId: UUID, userId: UUID, service: ServiceProperties) {
        if (!Utils.isType(service, ServiceProps)) {
            throw new BadRequestException("Missing important properties.");
        }

        const safeUser = Security.escapeObject(service);

        const result = await Database.client.query(
            `INSERT INTO Services (
                companyId,
                name,
                description,
                mesureUnit,
                value,
                type,
                errorMargin,
                createdBy
            ) VALUES (
                '${companyId}',
                '${safeUser.name}',
                '${safeUser.description}',
                '${safeUser.mesureUnit}',
                '${safeUser.value}',
                '${safeUser.type}',
                '${safeUser.errorMargin}',
                '${userId}'
            ) RETURNING companyId, id, name, description, mesureUnit, value, type, errorMargin, createdBy, createdAt, updatedAt`
        );

        return result.rows.map(i => processService(i)).map(i => { delete i.companyId; return i; })[0];
    }

    public static async update(companyId: UUID, serviceId: UUID, service: ServiceUpdate) {
        const updObj = Utils.filterObject<(keyof ServiceProperties)[], ServiceUpdate>(service, ServiceProps);

        if (Object.keys(updObj).length == 0) {
            throw new BadRequestException("Missing important properties.");
        }

        await this.serviceExists(companyId, serviceId);

        const safeService = Security.escapeObject(updObj);

        const updStr = Utils.buildUpdateString(safeService);

        const result = await Database.client.query(
            `UPDATE Services SET ${updStr} WHERE companyId='${companyId}' AND id='${serviceId}'
            RETURNING companyId, id, name, description, mesureUnit, value, type, errorMargin, createdBy, createdAt, updatedAt`
        );

        return result.rows.map(i => processService(i)).map(i => { delete i.companyId; return i; })[0];
    }

    public static async delete(companyId: UUID, serviceId: UUID) {
        await this.serviceExists(companyId, serviceId);

        await Database.client.query(
            `DELETE FROM Services WHERE companyId='${companyId}' AND id='${serviceId}'`
        );
        return serviceId;
    }

    public static async serviceExists(companyId: UUID, userId: UUID) { return await Service.getById(companyId, userId) }
}
