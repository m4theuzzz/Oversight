import { v4 } from "uuid";
import { UnprocessableEntityException } from "./Exception";

export class UUID extends String {
    public static randomUUID(): UUID {
        return v4();
    }

    public static fromString(text: string): UUID {
        if (this.checkIntegrity(text)) {
            return text as UUID;
        } else {
            throw new UnprocessableEntityException("String is not a UUID");
        }
    }

    private static checkIntegrity(text: string): boolean {
        return /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(text);
    }
}
