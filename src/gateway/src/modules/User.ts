import { UserProperties, UserUpdate, UserProps, processUser, UserEntity } from "../types/UserTypes";
import { UUID } from "./utils/UUID";
import { BadRequestException, NotFoundException } from "./utils/Exception";
import { Database } from "./utils/Database";
import { Security } from "./utils/Security";
import { Utils } from "./utils/Utils";

export class User {
    public static async getAll(companyId: UUID, filters: any): Promise<UserEntity[]> {
        const limit = filters?.pageSize ?? 20;
        const offset = ((filters?.page ?? 1) - 1) * limit;

        const result = await Database.client.query(
            `SELECT *, count(1) OVER() as totalLength FROM Users WHERE companyId='${companyId}' LIMIT ${limit} OFFSET ${offset}`
        );

        const users = result.rows.map(user => processUser(user)).map(user => {
            delete user.password;
            return user;
        });

        return users;
    }

    public static async getByEmail(email: string): Promise<UserEntity> {
        const result = await Database.client.query(
            `SELECT * FROM Users WHERE email='${email}'`
        );

        if (result.rows.length == 0) {
            throw new NotFoundException("User not found.");
        }

        return processUser(result.rows[0]);
    }

    public static async getById(companyId: UUID, id: UUID): Promise<UserEntity> {
        const result = await Database.client.query(
            `SELECT * FROM Users WHERE companyId='${companyId}' AND id='${id}'`
        );

        if (result.rows.length == 0) {
            throw new NotFoundException("User not found.");
        }

        return result.rows.map(user => processUser(user)).map(user => {
            delete user.password;
            return user;
        })[0];
    }

    public static async insert(companyId: UUID, user: UserProperties): Promise<UserEntity> {
        if (!Utils.isType(user, UserProps)) {
            throw new BadRequestException("Missing important properties.");
        }

        const safeUser = user;

        const result = await Database.client.query(
            `INSERT INTO Users (companyId, name, email, role, password) VALUES (
                '${companyId}',
                '${safeUser.name}',
                '${safeUser.email}',
                '${safeUser.role}',
                '${Security.AESEncrypt(safeUser.password)}'
            ) RETURNING companyId, id, name, email, role`
        );

        return result.rows.map(i => processUser(i)).map(i => { delete i.companyId; return i; })[0];
    }

    public static async update(companyId: UUID, userId: UUID, user: UserUpdate): Promise<UserEntity> {
        const updObj = Utils.filterObject<(keyof UserProperties)[], UserUpdate>(user, UserProps);

        if (Object.keys(updObj).length == 0) {
            throw new BadRequestException("Missing important properties.");
        }

        await this.userExists(companyId, userId);


        const safeUser = updObj;

        const updStr = Utils.buildUpdateString(safeUser);

        const result = await Database.client.query(
            `UPDATE Users SET ${updStr} WHERE companyId='${companyId}' AND id='${userId}'
            RETURNING companyId, id, name, email, role`
        );

        return result.rows.map(i => processUser(i)).map(i => { delete i.companyId; return i; })[0];
    }

    public static async delete(companyId: UUID, userId: UUID): Promise<UUID> {
        await this.userExists(companyId, userId);

        await Database.client.query(
            `DELETE FROM Users WHERE companyId='${companyId}' AND id='${userId}'`
        );
        return userId;
    }

    public static async userExists(companyId: UUID, userId: UUID) { return await User.getById(companyId, userId) }
}
