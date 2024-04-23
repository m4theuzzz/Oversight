import 'dotenv/config';
import * as crypto from 'crypto';
import { sign, verify } from 'jsonwebtoken';
import { MessageAuth, MessageData } from '../../types/MessageTypes';
import { NextFunction, Request, Response } from 'express';

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

    static JWTDecrypt(sessionToken: string): MessageData {
        const userData = verify(sessionToken, process.env.KEY) as MessageData;
        return userData;
    }

    protected static validateHash(hash: string): Boolean {
        return this.AESDecrypt(hash) == process.env.AUTH;
    }

    public static middleware(req: Request, res: Response, next: NextFunction) {
        if (
            !!req.headers['company-id'] &&
            !!req.headers['budget-id']
        ) {
            if (Security.validateHash(String(req.headers['auth-token']))) {
                return next();
            } else {
                return res.status(401).send("Token de Autenticação inválido.");
            }
        } else {
            return res.status(400).send("Insuficient Headers.");
        }
    }
}
