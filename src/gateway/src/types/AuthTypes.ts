import { UUID } from "../modules/utils/UUID";
import { UserRoles } from "./UserTypes";

interface AccessView {
    id: UUID,
    companyId: UUID,
    role: UserRoles,
}

interface LoginView {
    email: string,
    password: string
}

const LoginProps = ["email", "password"]

export {
    AccessView,
    LoginView,
    LoginProps
}
