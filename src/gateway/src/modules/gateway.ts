import axios, { AxiosRequestConfig } from "axios";
import { BadRequestException, ForbiddenException, UnexpectedException } from "./utils/Exception";

export class Gateway {
    private static apiUrl = process.env.API_URL;
    private static messageUrl = process.env.MESSENGER_URL;

    private static async AxiosRequest(method: string, url: string, config: AxiosRequestConfig, body?: any) {
        switch (method) {
            case 'GET':
                return await axios.get(url, config);
            case 'POST':
                if (!body) {
                    throw new BadRequestException("Missing body.");
                }
                return await axios.post(url, body, config);
            case 'PUT':
                if (!body) {
                    throw new BadRequestException("Missing body.");
                }
                return await axios.put(url, body, config);
            case 'DELETE':
                return await axios.delete(url, config);

            default:
                throw new ForbiddenException("Method not supported.");
        }
    }

    static async redirect<T>(method: string, url: string, headers: T, body?: any, isMessage?: boolean) {
        try {
            if (!isMessage) {
                //@ts-ignore
                return await this.AxiosRequest(method, this.apiUrl + url, { headers }, body);
            } else {
                //@ts-ignore
                return await this.AxiosRequest(method, this.messageUrl + url, { headers }, body);
            }
        } catch (error) {
            if (error.status) {
                throw error;
            } else {
                throw new UnexpectedException(error.message);
            }
        }
    }
}
