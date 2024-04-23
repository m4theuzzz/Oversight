import { describe, expect, test, jest, beforeEach, beforeAll } from '@jest/globals';
import * as request from 'supertest';

describe('Test redirect', () => {
    const baseUrl = 'http://localhost:3000';
    const mockEmail = "matvsan@gmail.com";
    const mockPass = "hixbek-rapNib-semri3";
    let sessionToken = '';
    let userId = '';

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

    test('should create user', async () => {
        const res = await request(baseUrl)
            .post('/users')
            .set('session-token', sessionToken)
            .send({
                "name": "Samara",
                "email": "sam@gmail.com",
                "role": "admin",
                "password": "123"
            });

        userId = res.body.id;
        expect(res.body.name).toBe("Samara");
        expect(res.status).toBe(200);
    });

    test('basic users should not be able access users', async () => {
        const user = (await request(baseUrl)
            .post('/users')
            .set('session-token', sessionToken)
            .send({
                "name": "Basico",
                "email": "basic@gmail.com",
                "role": "basic",
                "password": "123"
            })).body;

        const userLogin = {
            email: "basic@gmail.com",
            password: "123"
        };

        const response = await request(baseUrl)
            .post('/login')
            .send(userLogin);

        const basicSessionToken = response.body.sessionToken;

        const res = await request(baseUrl)
            .get('/users')
            .set('session-token', basicSessionToken)
            .send();

        expect(res.status).toBe(401);

        await request(baseUrl)
            .delete(`/users/${user.id}`)
            .set('session-token', sessionToken)
            .send();
    });

    test('should get all users', async () => {
        const res = await request(baseUrl)
            .get('/users')
            .set('session-token', sessionToken)
            .send();

        expect(res.body.length).toBeGreaterThan(0);
        expect(res.status).toBe(200);
    });

    test('should get user by id', async () => {
        const res = await request(baseUrl)
            .get(`/users/${userId}`)
            .set('session-token', sessionToken)
            .send();

        expect(res.status).toBe(200);
    });

    test('should update user', async () => {
        const res = await request(baseUrl)
            .put(`/users/${userId}`)
            .set('session-token', sessionToken)
            .send({
                "name": "Samara GG"
            });

        expect(res.body.name).toBe("Samara GG");
        expect(res.status).toBe(200);
    });

    test('should delete user', async () => {
        const res = await request(baseUrl)
            .delete(`/users/${userId}`)
            .set('session-token', sessionToken)
            .send();

        expect(res.status).toBe(200);
    });
});
