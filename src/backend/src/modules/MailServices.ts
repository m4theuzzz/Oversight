import { MailServiceData, processMailService } from "../types/MailServicesTypes";
import { Database } from "./utils/Database";

export class MailServices {
    public static async getMailServices() {
        const result = await Database.client.query<MailServiceData>(
            `SELECT * FROM MailServices`
        );

        return result.rows.map(data => processMailService(data));
    }
}