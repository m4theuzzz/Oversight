import 'dotenv/config';
import * as crypto from 'crypto';
import { UserEntity, UserSession } from '../../types/UserTypes';
import { sign, verify } from 'jsonwebtoken';

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

    static JWTEncrypt(userData: UserEntity) {
        const expireDate = new Date();
        expireDate.setHours(expireDate.getHours() + 6);

        return sign(
            {
                id: userData.id,
                companyId: userData.companyId,
                email: userData.email,
                password: userData.password,
                role: userData.role,
                expireAt: expireDate
            },
            process.env.KEY
        );
    }

    static JWTDecrypt<T>(sessionToken: string): T {
        console.log("----- Decript Token -----");
        const userData = verify(sessionToken, process.env.KEY) as T;
        console.log({ userData })
        return userData;
    }

    static genHash() {
        return this.AESEncrypt(process.env.AUTH);
    }
}
