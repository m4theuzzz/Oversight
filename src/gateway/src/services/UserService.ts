import { User } from "../modules/User";
import { NotFoundException, UnauthorizedException, UnexpectedException } from "../modules/utils/Exception";
import { UUID } from "../modules/utils/UUID";
import { UserEntity, UserProperties, UserUpdate } from "../types/UserTypes";

export class UserService {
    public static async getAll(companyId: UUID, filters?: any): Promise<UserEntity[]> {
        return await User.getAll(companyId, filters);
    }

    public static async getById(companyId: UUID, userId: UUID): Promise<UserEntity> {
        try {
            const user = await User.getById(companyId, userId);
            return user
        } catch (error) {
            if (error.status) {
                throw error;
            } else {
                console.log(error);
                throw new NotFoundException("User not found.");
            }
        }
    }

    public static async getByEmail(email: string): Promise<UserEntity> {
        try {
            const user = await User.getByEmail(email);
            return user
        } catch (error) {
            if (error.status) {
                throw error;
            } else {
                console.log(error);
                throw new NotFoundException("User not found.");
            }
        }
    }

    public static async post(companyId: UUID, requesterId: UUID, userData: UserProperties): Promise<UserEntity> {
        try {
            if (userData.role == "master") {
                const requester = await User.getById(companyId, requesterId);
                if (requester.role !== 'master') {
                    throw new UnauthorizedException("You does not have permission to create a Master user.");
                }
            }

            const user = await User.insert(companyId, userData);
            return user
        } catch (error) {
            if (error.status) {
                throw error;
            } else {
                console.log(error);
                throw new UnexpectedException("Couldn't create a new user, try again later.");
            }
        }
    }

    public static async put(companyId: UUID, userId: UUID, userData: UserUpdate): Promise<UserEntity> {
        try {
            const user = await User.update(companyId, userId, userData);
            return user
        } catch (error) {
            if (error.status) {
                throw error;
            } else {
                console.log(error);
                throw new UnexpectedException("Couldn't update the user, try again later.");
            }
        }
    }

    public static async delete(companyId: UUID, userId: UUID): Promise<UUID> {
        try {
            await User.delete(companyId, userId);
            return userId;
        } catch (error) {
            if (error.status) {
                throw error;
            } else {
                console.log(error);
                throw new UnexpectedException("Couldn't delete the user, try again later.");
            }
        }
    }
}
