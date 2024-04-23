import { Request, Response, NextFunction } from "express";
import { Actions, Tables } from "../types/MiscTypes";
import { UserRoles, UserSession } from "../types/UserTypes";
import { BadRequestException, ForbiddenException, NotFoundException, UnauthorizedException, UnexpectedException } from "./utils/Exception";
import { Security } from "./utils/Security";
import { AccessView } from "../types/AuthTypes";
import { User } from "./User";
import { MessageData } from "../types/MessageTypes";

export class Auth {
    //Sequence: GET, POST, PUT, DELETE
    private static TablesPermissions = {
        [UserRoles.BASIC]: {
            [Tables.COMPANIES]: [true, false, false, false],
            [Tables.USERS]: [false, false, false, false],
            [Tables.CUSTOMERS]: [true, true, true, true],
            [Tables.SERVICES]: [true, true, true, true],
            [Tables.BUDGETS]: [true, true, true, true],
            [Tables.BUDGET_SERVICES]: [true, true, true, true],
        },
        [UserRoles.ADMIN]: {
            [Tables.COMPANIES]: [true, false, false, false],
            [Tables.USERS]: [true, true, true, true],
            [Tables.CUSTOMERS]: [true, true, true, true],
            [Tables.SERVICES]: [true, true, true, true],
            [Tables.BUDGETS]: [true, true, true, true],
            [Tables.BUDGET_SERVICES]: [true, true, true, true],
        },
        [UserRoles.MASTER]: {
            [Tables.COMPANIES]: [true, true, true, true],
            [Tables.USERS]: [true, true, true, true],
            [Tables.CUSTOMERS]: [true, true, true, true],
            [Tables.SERVICES]: [true, true, true, true],
            [Tables.BUDGETS]: [true, true, true, true],
            [Tables.BUDGET_SERVICES]: [true, true, true, true],
        }
    }

    private static hasPermission(role: UserRoles, table: Tables, action: Actions) {
        //@ts-ignore
        if (table == 'mail' || table == 'renew') {
            return true;
        }

        return this.TablesPermissions[role][table][action]
    }

    public static authorize = async (email: string, password: string) => {
        try {
            const user = await User.getByEmail(email);

            if (!user) {
                throw new NotFoundException("Usuário não cadastrado.");
            }

            if (Security.AESDecrypt(user.password) == password || user.password == password) {
                return {
                    "user": {
                        "id": user.id,
                        "name": user.name,
                        "email": user.email,
                        "role": user.role
                    },
                    "sessionToken": Security.JWTEncrypt(user)
                };
            } else {
                throw new BadRequestException("Senha incorreta.");
            }
        } catch (error) {
            if (error.status) {
                throw error;
            } else {
                console.log(error.message);
                throw new UnexpectedException('A unexpected exception happened');
            }
        }
    }

    public static authenticate = async (sessionToken: string): Promise<AccessView> => {
        try {
            const userData = Security.JWTDecrypt<UserSession>(sessionToken);

            if (this.tokenIsValid(userData)) {
                await this.authorize(userData.email, Security.AESDecrypt(userData.password));
                const authenticatedUser = await User.getByEmail(userData.email);
                return { id: authenticatedUser.id, companyId: authenticatedUser.companyId, role: authenticatedUser.role } as AccessView;
            }
        } catch (error) {
            throw new UnexpectedException(error.message);
        }
    }

    private static async validateSessionToken(req: Request): Promise<boolean> {
        const sessionToken = req.headers['session-token'] as string;
        const { id, role, companyId } = await this.authenticate(sessionToken);
        const table = this.getTable(req.baseUrl);
        const method = this.getAction(req.method);
        if (this.hasPermission(role, table, method)) {
            req.sessionID = String(id);
            req.headers['role'] = String(role);
            if (role == 'master') {
                req.headers['company-id'] =
                    !!req.headers['company-id'] ? String(req.headers['company-id']) : String(companyId);
            } else {
                req.headers['company-id'] = String(companyId);
            }
            return true;
        }
        return false;
    }

    private static async validateMessageToken(req: Request): Promise<boolean> {
        const messageToken = req.headers['message-token'] as string;
        const { companyId, budgetId, expireAt } = Security.JWTDecrypt<MessageData>(messageToken);

        if (new Date(expireAt).getTime() <= Date.now()) {
            throw new ForbiddenException("Token expirado.");
        }

        if (typeof req.body.approved == 'undefined') {
            throw new BadRequestException("Missing approval parameter.");
        }

        req.headers["company-id"] = String(companyId);
        req.headers["budget-id"] = String(budgetId);
        return true;
    }

    public static middleware = async (req: Request, res: Response, next: NextFunction) => {
        if (req.headers["session-token"]) {
            try {
                if (await this.validateSessionToken(req)) {
                    return next();
                } else {
                    return res.status(401).send("You doesn't have the right permissions.");
                }
            } catch (error) {
                if (error.status) {
                    return res.status(error.status).send(error.message);
                } else {
                    console.log(error)
                    return res.status(403).send("Token Inválido.");
                }
            }
        } else if (req.headers["message-token"]) {
            try {
                if (await this.validateMessageToken(req)) {
                    return next();
                } else {
                    return res.status(401).send("You doesn't have the right permissions.");
                }
            } catch (error) {
                if (error.status) {
                    return res.status(error.status).send(error.message);
                } else {
                    return res.status(403).send("Token Inválido.");
                }
            }
        } else {
            return res.status(406).send("Token de autenticação não recebido.");
        }
    }

    private static getAction = (action: string): Actions => {
        switch (action) {
            case "POST":
                return Actions.POST;
            case "PUT":
                return Actions.PUT;
            case "DELETE":
                return Actions.DELETE;
            case "GET":
            default:
                return Actions.GET;
        }
    }

    private static getTable = (url: string): Tables => {
        if (/(budgets)+.+(services)/g.test(url)) {
            return Tables.BUDGET_SERVICES
        }
        if (/budgets/g.test(url)) {
            return Tables.BUDGETS
        }
        if (/services/g.test(url)) {
            return Tables.SERVICES
        }
        if (/customers/g.test(url)) {
            return Tables.CUSTOMERS
        }
        if (/users/g.test(url)) {
            return Tables.USERS
        }
        if (/companies/g.test(url)) {
            return Tables.COMPANIES
        }
        if (/renew/g.test(url)) {
            //@ts-ignore
            return 'renew';
        }
        if (/mail/g.test(url)) {
            //@ts-ignore
            return 'mail';
        }

        throw new NotFoundException("Route does not exists.");
    }

    private static tokenIsValid = (userData: UserSession): boolean => {
        if (
            !userData.id ||
            !userData.companyId ||
            !userData.email ||
            !userData.password ||
            !userData.role ||
            !userData.expireAt
        ) {
            throw new ForbiddenException("Token inválido.");
        }

        const now = new Date();

        if (now > new Date(userData.expireAt)) {
            throw new ForbiddenException("Token expirado.");
        }

        return true;
    }
}