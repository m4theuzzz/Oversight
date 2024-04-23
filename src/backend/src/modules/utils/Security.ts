import 'dotenv/config';
import * as crypto from 'crypto';
import { Request, Response, NextFunction } from "express";
import { sign } from 'jsonwebtoken';
import { MessageAuth, MessageData } from '../../types/MessageTypes';

const ALGORITHM = 'aes-256-gcm';

export class Security {
    private static IV_LENGTH = 16;
    private static SALT_LENGTH = 64;
    private static TAG_LENGTH = 16;
    private static TAG_POSITION = this.SALT_LENGTH + this.IV_LENGTH;
    private static ENCRYPTED_POSITION = this.TAG_POSITION + this.TAG_LENGTH;

    static getKey(salt: Buffer) {
        return crypto.pbkdf2Sync(process.env.KEY, salt, 100000, 32, 'sha512');
    }

    static AESEncrypt(plainText: string) {
        const iv = crypto.randomBytes(this.IV_LENGTH);
        const salt = crypto.randomBytes(this.SALT_LENGTH);

        const key = this.getKey(salt);

        const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
        const encrypted = Buffer.concat([
            cipher.update(String(plainText), 'utf8'),
            cipher.final(),
        ]);

        const tag = cipher.getAuthTag();

        return Buffer.concat([salt, iv, tag, encrypted]).toString('base64');
    }

    static AESDecrypt(cipherText: string) {
        const stringValue = Buffer.from(String(cipherText), 'base64');

        const salt = stringValue.slice(0, this.SALT_LENGTH);
        const iv = stringValue.slice(this.SALT_LENGTH, this.TAG_POSITION);
        const tag = stringValue.slice(this.TAG_POSITION, this.ENCRYPTED_POSITION);
        const encrypted = stringValue.slice(this.ENCRYPTED_POSITION);

        const key = this.getKey(salt);

        const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);

        decipher.setAuthTag(tag);

        return decipher.update(encrypted) + decipher.final('utf8');
    }

    static escapeString(base: any): any {
        if (typeof base != 'string') {
            return base;
        }

        let escaped = "";

        for (let char of base) {
            // if (/[^\w\d\s]/g.test(char)) {
            //     escaped += `\\${char}`;
            // } else {
            escaped += char
            // }
        }

        return escaped;
    }

    static escapeObject<T>(obj: T): T {
        return Object.keys(obj).reduce((acc, cur) => {
            //@ts-ignore
            acc[cur] = this.escapeString(obj[cur]);
            return acc;
        }, {} as T);
    }

    static JWTEncrypt(mailData: MessageData) {
        console.log("----- Encript Message Token -----");
        const expireDate = new Date();
        expireDate.setHours(expireDate.getHours() + 72);
        console.log({ mailData });

        return sign(
            {
                companyId: mailData.companyId,
                budgetId: mailData.budgetId,
                expireAt: expireDate
            },
            process.env.KEY
        );
    }

    protected static validateHash(hash: string): Boolean {
        return this.AESDecrypt(hash) == process.env.AUTH;
    }

    public static middleware(req: Request, res: Response, next: NextFunction) {
        if (
            !!req.headers['company-id'] &&
            !!req.headers['user-id'] &&
            !!req.headers['role'] &&
            !!req.headers['auth-token']
        ) {
            if (Security.validateHash(req.headers['auth-token'] as string)) {
                return next();
            } else {
                return res.status(401).send("Token de Autenticação inválido.");
            }
        } else {
            return res.status(400).send("Insuficient Headers.");
        }
    }
}
