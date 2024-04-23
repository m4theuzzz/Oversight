
import { CustomerEntity, CustomerFilters, CustomerFiltersProps, CustomerProperties, CustomerProps, CustomerUpdate, processCustomer } from "../types/CustomerTypes";
import { APIResponseProperties } from "../types/MiscTypes";
import { APIResponse } from "./utils/APIResponse";
import { Database } from "./utils/Database";
import { BadRequestException, NotFoundException } from "./utils/Exception";
import { Security } from "./utils/Security";
import { UUID } from "./utils/UUID";
import { Utils } from "./utils/Utils";

export class Customer {
    public static async getAll(companyId: UUID, filters?: CustomerFilters): Promise<APIResponseProperties> {
        const limit = filters?.pageSize ?? 20;
        const offset = ((filters?.page ?? 1) - 1) * limit;
        let query = `SELECT *, count(1) OVER() as totalLength FROM Customers WHERE companyId='${companyId}'`;
        filters?.pageSize ? delete filters.pageSize : null;
        filters?.page ? delete filters.page : null;

        if (Object.keys(filters).length) {
            if (filters.address) {
                query = `
                    SELECT *, count(1) OVER() as totalLength
                    FROM Customers C
                    INNER JOIN Addresses A
                    ON A.customerid = C.id
                    WHERE C.companyId='${companyId}'
                    AND (CAST(A.cep AS VARCHAR) like '${filters.address}%' OR A.street like '${filters.address}%')
                `;
                delete filters.address;
            }

            const customerFilters = Utils.filterObject<(keyof CustomerFilters)[], CustomerFilters>(filters, CustomerFiltersProps);
            query += Database.buildFilters(filters, Object.keys(customerFilters) as (keyof CustomerFilters)[]);
        }

        query += `LIMIT ${limit} OFFSET ${offset}`;

        const result = await Database.client.query(query);

        const customers = result.rows.map(customer => processCustomer(customer)).map(customer => {
            delete customer.companyId;
            return customer;
        });
        const totalLength = result.rows[result.rows.length - 1]?.totallength ?? 0;

        return APIResponse.buildList(customers, totalLength, filters?.page, filters?.pageSize)
    }

    public static async getById(companyId: UUID, id: UUID): Promise<CustomerEntity> {
        const result = await Database.client.query(
            `SELECT * FROM Customers WHERE companyId='${companyId}' AND id='${id}'`
        );

        if (result.rows.length == 0) {
            throw new NotFoundException("Customer not found.");
        }

        return result.rows.map(customer => processCustomer(customer)).map(customer => {
            delete customer.companyId;
            return customer;
        })[0];
    }

    public static async getByEmail(email: string) { }

    public static async insert(companyId: UUID, userId: UUID, customer: CustomerProperties) {
        if (!Utils.isType(customer, CustomerProps)) {
            throw new BadRequestException("Missing important properties.");
        }

        const safeUser = Security.escapeObject(customer);

        const result = await Database.client.query(
            `INSERT INTO Customers (companyId, name, email, phone, createdBy) VALUES (
                '${companyId}',
                '${safeUser.name}',
                '${safeUser.email}',
                '${safeUser.phone}',
                '${userId}'
            ) RETURNING companyId, id, name, email, phone, createdBy, createdAt, updatedAt`
        );

        return result.rows.map(i => processCustomer(i)).map(i => { delete i.companyId; return i; })[0];
    }

    public static async update(companyId: UUID, customerId: UUID, customer: CustomerUpdate) {
        const updObj = Utils.filterObject<(keyof CustomerProperties)[], CustomerUpdate>(customer, CustomerProps);

        if (Object.keys(updObj).length == 0) {
            throw new BadRequestException("Missing important properties.");
        }

        await this.customerExists(companyId, customerId);

        const safeCustomer = Security.escapeObject(updObj);

        const updStr = Utils.buildUpdateString(safeCustomer);

        const result = await Database.client.query(
            `UPDATE Customers SET ${updStr} WHERE companyId='${companyId}' AND id='${customerId}'
            RETURNING companyId, id, name, email, phone, createdBy, createdAt, updatedAt`
        );

        return result.rows.map(i => processCustomer(i)).map(i => { delete i.companyId; return i; })[0];
    }

    public static async delete(companyId: UUID, customerId: UUID) {
        await this.customerExists(companyId, customerId);

        await Database.client.query(
            `DELETE FROM Customers WHERE companyId='${companyId}' AND id='${customerId}'`
        );
        return customerId;
    }

    public static async customerExists(companyId: UUID, userId: UUID) { return await Customer.getById(companyId, userId) }
}
