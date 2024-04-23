import * as mailer from 'nodemailer';
import { Email } from '../types/MailServicesTypes';
import { CompanyEntity } from '../types/CompanyTypes';
import { MailServices } from './MailServices';
import { UnauthorizedException, UnexpectedException } from './utils/Exception';

export class Mailer {
    private transporter: mailer.Transporter = null;
    private companyEmail: string = null;
    private companyEmailPass: string = null;

    constructor(company: CompanyEntity) {
        if (!company.emailPass) {
            throw new UnauthorizedException("Sem email configurado, por favor configure através do painel.");
        }
        this.companyEmail = company.email;
        this.companyEmailPass = company.emailPass;
    }

    private getSmtp = async (email: string) => {
        const services = await MailServices.getMailServices();
        return services.find(ms => ms.name.indexOf(email.split('@')[1].split('.')[0]) >= 0);
    }

    private buildTransporter = async () => {
        const smtp = await this.getSmtp(this.companyEmail);
        return mailer.createTransport({
            pool: true,
            host: smtp.host,
            port: smtp.port,
            auth: {
                user: this.companyEmail,
                pass: this.companyEmailPass
            }
        });
    }

    sendMessage = async (emailInfo: Email): Promise<void> => {
        try {
            if (!this.transporter) {
                this.transporter = await this.buildTransporter();
            }

            console.log({
                from: emailInfo.from,
                to: `${emailInfo.to}`,
                subject: emailInfo.subject,
                text: emailInfo.text ?? null,
                html: emailInfo.html ?? null
            })

            return this.transporter.sendMail({
                from: emailInfo.from ? emailInfo.from : `"Oversight" <${process.env.APP_EMAIL}>`,
                to: `${emailInfo.to}`,
                subject: emailInfo.subject,
                text: emailInfo.text ?? null,
                html: emailInfo.html ?? null
            }, (err: any, info: any) => {
                if (err) {
                    console.log(err)
                    throw err.message
                }

                console.log(info.response);
            });
        } catch (error) {
            console.log(error);
            throw new UnexpectedException(error.message);
        }
    }
}