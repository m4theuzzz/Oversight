import { describe, expect, test, jest, beforeEach, beforeAll, afterAll } from '@jest/globals';
import * as request from 'supertest';

describe('Test addresses', () => {
    const baseUrl = 'http://localhost:3000';
    const mockEmail = "matvsan@gmail.com";
    const mockPass = "hixbek-rapNib-semri3";
    let sessionToken = '';
    let addressId = '';
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

        const customer = await request(baseUrl)
            .post('/customers')
            .set('session-token', sessionToken)
            .send({
                "name": "Test",
                "email": "test@gmail.com",
                "phone": 31987654321
            });

        customerId = customer.body.data.id;
    });

    afterAll(async () => {
        await request(baseUrl)
            .delete(`/customers/${customerId}`)
            .set('session-token', sessionToken)
            .send();
    });

    beforeEach(() => {
        jest.resetAllMocks();
        jest.resetModules();
        jest.setTimeout(60000);
    });

    test('should create address', async () => {
        const res = await request(baseUrl)
            .post(`/customers/${customerId}/address`)
            .set('session-token', sessionToken)
            .send({
                "cep": 87654321,
                "street": "Rua Teste da Silva Sauro",
                "number": 666,
                "complement": "casa"
            });

        addressId = res.body.data.id;
        expect(res.body.data.street).toBe("Rua Teste da Silva Sauro");
        expect(res.status).toBe(200);
    });

    test('should get customer address', async () => {
        const res = await request(baseUrl)
            .get(`/customers/${customerId}/address`)
            .set('session-token', sessionToken)
            .send();

        expect(res.body.data.number).toBe(666);
        expect(res.status).toBe(200);
    });

    test('should update address', async () => {
        const res = await request(baseUrl)
            .put(`/customers/${customerId}/address`)
            .set('session-token', sessionToken)
            .send({
                "street": "Rua Teste",
            });

        expect(res.body.data.street).toBe("Rua Teste");
        expect(res.status).toBe(200);
    });
});
