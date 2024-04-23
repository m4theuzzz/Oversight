import { BadRequestException, UnexpectedException } from "../modules/utils/Exception"
import { UUID } from "../modules/utils/UUID"

interface UserProperties {
    name: string,
    email: string,
    role: UserRoles,
    password: string,
}

interface UserUpdate {
    name?: string,
    email?: string,
    role?: UserRoles
}

interface UserData extends UserProperties {
    companyid: UUID,
    id: UUID,
    createdat: Date,
    updatedat: Date
}

interface UserEntity extends UserProperties {
    companyId: UUID,
    id: UUID,
    createdAt: Date,
    updatedAt: Date
}

interface UserSession {
    id: UUID,
    companyId: UUID,
    email: string,
    password: string,
    role: UserRoles,
    expireAt: Date
}

enum UserRoles {
    BASIC = 'basic',
    ADMIN = 'admin',
    MASTER = 'master'
}

const UserProps: (keyof UserProperties)[] = ["name", "email", "role", "password"];

const processUser = (data: UserData) => ({
    name: data.name,
    email: data.email,
    role: data.role,
    password: data.password,
    companyId: data.companyid,
    id: data.id,
    createdAt: data.createdat,
    updatedAt: data.updatedat
});

const userRoleFromString = (role: string) => {
    switch (role) {
        case 'basic':
            return UserRoles.BASIC
        case 'admin':
            return UserRoles.ADMIN
        case 'master':
            return UserRoles.MASTER

        default:
            throw new UnexpectedException("Not a Role.")
    }
}

export {
    UserProperties,
    UserUpdate,
    UserData,
    UserEntity,
    UserSession,
    UserRoles,
    UserProps,
    processUser,
    userRoleFromString
}
