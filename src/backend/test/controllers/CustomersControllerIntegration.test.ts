import { describe, expect, test, jest, beforeEach, beforeAll } from '@jest/globals';
import * as request from 'supertest';

describe('Test customers', () => {
    const baseUrl = 'http://localhost:3000';
    const mockEmail = "matvsan@gmail.com";
    const mockPass = "hixbek-rapNib-semri3";
    let sessionToken = '';
    let customerId = '';

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
        jest.setTimeout(60000);
    });

    test('should create customer', async () => {
        const res = await request(baseUrl)
            .post('/customers')
            .set('session-token', sessionToken)
            .send({
                "name": "Matheus",
                "email": "matvsan@gmail.com",
                "phone": 31987654321
            });

        customerId = res.body.data.id;
        expect(res.body.data.name).toBe("Matheus");
        expect(res.status).toBe(200);
    });

    test('should get all customers', async () => {
        const res = await request(baseUrl)
            .get('/customers')
            .set('session-token', sessionToken)
            .send();

        expect(res.body.data.length).toBeGreaterThan(0);
        expect(res.status).toBe(200);
    });

    test('should get customer by id', async () => {
        const res = await request(baseUrl)
            .get(`/customers/${customerId}`)
            .set('session-token', sessionToken)
            .send();

        expect(res.status).toBe(200);
    });

    test('should update customer', async () => {
        const res = await request(baseUrl)
            .put(`/customers/${customerId}`)
            .set('session-token', sessionToken)
            .send({
                "name": "Matheus GG"
            });

        expect(res.body.data.name).toBe("Matheus GG");
        expect(res.status).toBe(200);
    });

    test('should delete customer', async () => {
        const res = await request(baseUrl)
            .delete(`/customers/${customerId}`)
            .set('session-token', sessionToken)
            .send();

        expect(res.status).toBe(200);
    });
});
