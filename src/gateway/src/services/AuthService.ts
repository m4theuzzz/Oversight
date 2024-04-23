import { Auth } from "../modules/Auth";
import { LoginView } from "../types/AuthTypes";

export class AuthService {
    public static async login({ email, password }: LoginView) {
        return await Auth.authorize(email, password);
    }
}
