import { AddressEntity, AddressProperties, AddressProps, AddressUpdate, processAddress } from "../types/AddressTypes";
import { Database } from "./utils/Database";
import { BadRequestException, NotFoundException } from "./utils/Exception";
import { Security } from "./utils/Security";
import { UUID } from "./utils/UUID";
import { Utils } from "./utils/Utils";

export class Address {
    public static async getByCustomerId(customerId: UUID): Promise<AddressEntity> {
        const result = await Database.client.query(
            `SELECT * FROM Addresses WHERE customerId='${customerId}'`
        );

        if (result.rows.length == 0) {
            throw new NotFoundException("Customer not found.");
        }

        return result.rows.map(address => processAddress(address))[0];
    }

    public static async insert(customerId: UUID, address: AddressProperties) {
        if (!Utils.isType(address, AddressProps)) {
            throw new BadRequestException("Missing important properties.");
        }

        const safeAddress = Security.escapeObject(address);

        const result = await Database.client.query(
            `INSERT INTO Addresses (customerId, cep, street, number, complement) VALUES (
                '${customerId}',
                '${safeAddress.cep}',
                '${safeAddress.street}',
                '${safeAddress.number}',
                '${safeAddress.complement}'
            ) RETURNING customerId, cep, street, number, complement`
        );

        return result.rows.map(i => processAddress(i)).map(i => { delete i.customerId; return i; })[0]
    }

    public static async update(customerId: UUID, address: AddressUpdate) {
        const updObj = Utils.filterObject<(keyof AddressProperties)[], AddressUpdate>(address, AddressProps);

        if (Object.keys(updObj).length == 0) {
            throw new BadRequestException("Missing important properties.");
        }

        await this.addressExists(customerId);

        const safeAddress = Security.escapeObject(updObj);

        const updStr = Utils.buildUpdateString(safeAddress);

        const result = await Database.client.query(
            `UPDATE Addresses SET ${updStr} WHERE customerId='${customerId}'
            RETURNING customerId, cep, street, number, complement`
        );

        return result.rows.map(i => processAddress(i)).map(i => { delete i.customerId; return i; })[0];
    }

    public static async addressExists(customerId: UUID) { return await Address.getByCustomerId(customerId) }
}