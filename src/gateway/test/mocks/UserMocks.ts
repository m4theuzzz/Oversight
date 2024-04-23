import { Security } from "../../src/modules/utils/Security";
import { UUID } from "../../src/modules/utils/UUID";
import { UserRoles } from "../../src/types/UserTypes";

const masterUser = (mockEmail: string, mockPass: string) => ({
    "companyId": UUID.randomUUID(),
    "id": UUID.randomUUID(),
    "name": "Test User",
    "email": mockEmail,
    "role": UserRoles.MASTER,
    "password": Security.AESEncrypt(mockPass),
    "createdAt": new Date(),
    "updatedAt": new Date(),
});

const adminUser = (mockEmail: string, mockPass: string) => ({
    "companyId": UUID.randomUUID(),
    "id": UUID.randomUUID(),
    "name": "Test User",
    "email": mockEmail,
    "role": UserRoles.ADMIN,
    "password": Security.AESEncrypt(mockPass),
    "createdAt": new Date(),
    "updatedAt": new Date(),
});

const basicUser = (mockEmail: string, mockPass: string) => ({
    "companyId": UUID.randomUUID(),
    "id": UUID.randomUUID(),
    "name": "Test User",
    "email": mockEmail,
    "role": UserRoles.BASIC,
    "password": Security.AESEncrypt(mockPass),
    "createdAt": new Date(),
    "updatedAt": new Date(),
});

export {
    masterUser,
    adminUser,
    basicUser
}