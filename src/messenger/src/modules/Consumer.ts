import { Channel, Connection, ConsumeMessage, connect } from 'amqplib';
import { UnexpectedException } from './utils/Exception';
import { Postgres } from './utils/Postgres';
import { Message } from '../types/MessageTypes';

export class Consumer {
    private static connection: Connection;
    private static channel: Channel;
    private static host: string = process.env.AMQP_HOST;
    private static user: string = process.env.AMQP_USER;
    private static pass: string = process.env.AMQP_PASS;
    private static queueName: string = 'approvals';

    public static async connect(): Promise<void> {
        try {
            setTimeout(async () => { // Timeout to await rabbitMQ setup
                this.connection = await connect(`amqp://${this.user}:${this.pass}@${this.host}`);
                this.channel = await this.connection.createChannel();
                this.channel.assertExchange('logs', 'fanout', {
                    durable: false
                });
                await this.channel.assertQueue(this.queueName, { exclusive: true });
                await this.channel.bindQueue(this.queueName, 'logs', '');
                this.channel.consume(
                    this.queueName,
                    (msg: ConsumeMessage) => this.processMessage(msg),
                    { noAck: true }
                );
            }, 3000);
        } catch (error) {
            throw new UnexpectedException(error.message);
        }
    }

    private static async processMessage(message: ConsumeMessage) {
        try {
            const msg = JSON.parse(message.content.toString()) as Message;
            console.log("consumed", { msg });
            const status = msg.approved ? 'approved' : 'denied';
            const description = msg.description ?? null;

            await Postgres.client.query(`
                UPDATE
                    Budgets
                SET
                    status='${status}',
                    statusMessage='${description}'
                WHERE
                    companyId='${msg.companyId}'
                AND
                    id='${msg.budgetId}';
            `);
        } catch (error) {
            throw new UnexpectedException(error.message);
        }
    }
}
