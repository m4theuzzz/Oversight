process.env.KEY = 'test@key';

import { describe, expect, test, jest, beforeEach } from '@jest/globals';
import { Auth } from '../../src/modules/Auth';
import { masterUser } from '../mocks/UserMocks';
import { User } from '../../src/modules/User';

jest.mock('../../src/modules/User');
jest.mock('../../src/modules/utils/Database', () => {
    const client = {
        connect: jest.fn(),
        query: (text: string) => Promise.resolve([]),
        end: jest.fn()
    }
    return { Database: jest.fn(() => client) }
});


describe('Authorize', () => {
    const mockEmail = "test@email.com";
    const mockPass = "pw123";
    const userMaster = masterUser(mockEmail, mockPass);

    beforeEach(() => {
        jest.resetAllMocks();
        jest.resetModules();
    });

    test('Authorization Successful', async () => {
        jest.spyOn(User, 'getByEmail').mockImplementation(() => Promise.resolve(userMaster));

        const received = await Auth.authorize(mockEmail, mockPass);

        const expected = {
            "user": {
                "id": userMaster.id,
                "name": userMaster.name,
                "email": userMaster.email,
                "role": userMaster.role
            },
            "sessionToken": received.sessionToken
        }

        expect(received).toStrictEqual(expected);
    });

    test('Authorization Failed: User not found', async () => {
        try {
            await Auth.authorize(mockEmail, mockPass);
            expect(true).toBe(false);
        } catch (error) {
            expect(error.status).toBe(404);
            expect(error.message).toBe("Usuário não cadastrado.");
        }
    });
});
