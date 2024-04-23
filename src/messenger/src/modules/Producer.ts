import { Channel, Connection, connect } from 'amqplib';
import { UnexpectedException } from './utils/Exception';
import { Message } from '../types/MessageTypes';

export class Producer {
    private static connection: Connection;
    private static channel: Channel;
    private static host: string = process.env.AMQP_HOST;
    private static queueName: string = 'approvals';
    private static user: string = process.env.AMQP_USER;
    private static pass: string = process.env.AMQP_PASS;

    public static async connect(): Promise<boolean> {
        try {
            console.log("AMQP Connection: " + `amqp://${this.user}:${this.pass}@${this.host}`);
            this.connection = await connect(`amqp://${this.user}:${this.pass}@${this.host}`);
            this.channel = await this.connection.createChannel();
            this.channel.assertExchange('logs', 'fanout', {
                durable: false
            });
            return true;
        } catch (error) {
            console.log(error.message);
            return false;
        }
    }

    private static async close(): Promise<void> {
        await this.connection.close();
    }

    public static async post(message: Message): Promise<void> {
        try {
            if (!this.connection) {
                throw new UnexpectedException("Missing Connection.");
            }

            const sent = this.channel.sendToQueue(this.queueName, Buffer.from(JSON.stringify(message)));
            if (!sent) {
                throw new UnexpectedException("Something went wrong, sending the message.");
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
