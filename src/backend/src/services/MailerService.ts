import { Company } from "../modules/Company";
import { Mailer } from "../modules/Mailer";
import { NotFoundException, UnexpectedException } from "../modules/utils/Exception";
import { Security } from "../modules/utils/Security";
import { UUID } from "../modules/utils/UUID";
import { Email } from "../types/MailServicesTypes";

export class MailerService {

    public static async getToken(companyId: UUID, budgetId: UUID): Promise<String> {
        try {
            const company = await Company.getById(companyId);
            if (!company) {
                throw new NotFoundException("Empresa não encontrada.");
            }

            const mailer = new Mailer(company);
            const token = Security.JWTEncrypt({
                companyId,
                budgetId,
                title: "",
                approved: false
            });

            return token;
        } catch (error) {
            if (error.status) {
                throw error;
            } else {
                throw new UnexpectedException(error.message)
            }
        }
    }

    public static async send(companyId: UUID, emailBody: Email): Promise<String> {
        try {
            const company = await Company.getById(companyId);
            if (!company) {
                throw new NotFoundException("Empresa não encontrada.");
            }

            emailBody.from = company.email;

            const mailer = new Mailer(company);
            mailer.sendMessage(emailBody);

            return 'Email enviado com sucesso';
        } catch (error) {
            console.log(error)
            if (error.status) {
                throw error;
            } else {
                throw new UnexpectedException(error.message)
            }
        }
    }
}
