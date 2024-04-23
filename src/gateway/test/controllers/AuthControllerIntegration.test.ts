import { describe, expect, test, jest, beforeEach } from '@jest/globals';
import * as request from 'supertest';

jest.mock('../../src/services/AuthService');

describe('POST /login', () => {
    const baseUrl = 'http://localhost:3000';
    const mockEmail = "matvsan@gmail.com";
    const mockPass = "hixbek-rapNib-semri3";

    beforeEach(() => {
        jest.resetAllMocks();
        jest.resetModules();
    });

    test('Should login successfuly', async () => {
        const userLogin = {
            email: mockEmail,
            password: mockPass
        };

        const response = await request(baseUrl)
            .post('/login')
            .send(userLogin);

        expect(response.status).toBe(200);
    });

    test('Should fail with 400 when the request body is invalid', async () => {
        const userLogin = {
            email: "abc"
        };

        const response = await request(baseUrl)
            .post('/login')
            .send(userLogin);

        expect(response.status).toBe(400);
    });
});
