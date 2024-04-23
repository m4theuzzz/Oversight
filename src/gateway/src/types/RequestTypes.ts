import { UUID } from "../modules/utils/UUID";
import { UserRoles } from "./UserTypes";

interface AuthHeaders {
    "auth-token": string,
    "company-id": UUID,
    "user-id": UUID,
    "role": UserRoles,
    "budget-id"?: UUID,
}

export {
    AuthHeaders
}
