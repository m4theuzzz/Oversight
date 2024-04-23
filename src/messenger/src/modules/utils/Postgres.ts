import { Pool, PoolClient } from 'pg';
import { UnexpectedException } from './Exception';

export class Postgres {
    private static connectionString =
        `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

    private static connection: Pool

    public static client: PoolClient

    public static async connect(): Promise<void> {
        try {
            this.connection = new Pool({
                connectionString: this.connectionString
            });

            this.client = await this.connection.connect();
        } catch (error) {
            throw new UnexpectedException(error.message);
        }
    }

    public static isConnected() {
        return !!this.client;
    }
}
