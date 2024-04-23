import { describe, expect, test, jest, beforeEach, beforeAll } from '@jest/globals';
import * as request from 'supertest';

describe('Test redirect', () => {
    const baseUrl = 'http://localhost:3000';
    const mockEmail = "matvsan@gmail.com";
    const mockPass = "hixbek-rapNib-semri3";
    let sessionToken = '';

    beforeAll(async () => {
        const userLogin = {
            email: mockEmail,
            password: mockPass
        };

        const response = await request(baseUrl)
            .post('/login')
            .send(userLogin);

        sessionToken = response.body.sessionToken;
    });

    beforeEach(() => {
        jest.resetAllMocks();
        jest.resetModules();
    });

    test('Should redirect successfully', async () => {
        const res = await request(baseUrl)
            .get('/customers')
            .set('session-token', sessionToken)
            .send();

        expect(res.status).toBe(200);
    });

    test('Should fail with 400 when the request body is invalid', async () => {
        const res = await request(baseUrl)
            .post('/customers')
            .set('session-token', sessionToken)
            .send({});

        expect(res.status).toBe(400);
    });

    test('Should fail with 404 when route does not exists', async () => {
        const res = await request(baseUrl)
            .post('/clients')
            .set('session-token', sessionToken)
            .send({});

        expect(res.status).toBe(404);
    });
});
