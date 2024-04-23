import { describe, expect, test, jest, beforeEach, beforeAll, afterAll } from '@jest/globals';
import * as request from 'supertest';

describe('Test budgets', () => {
    const baseUrl = 'http://localhost:3000';
    const mockEmail = "matvsan@gmail.com";
    const mockPass = "hixbek-rapNib-semri3";
    let sessionToken = '';
    let budgetId = '';
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

    test('should create budget', async () => {
        const res = await request(baseUrl)
            .post('/budgets')
            .set('session-token', sessionToken)
            .send({
                "customerId": customerId,
                "name": "Orçamento do maluco q mora logo ali",
                "description": "descrição",
                "incomingMargin": 15,
                "status": "budgeting"
            });

        budgetId = res.body.data.id;
        expect(res.body.data.name).toBe("Orçamento do maluco q mora logo ali");
        expect(res.status).toBe(200);
    });

    test('should get all budgets', async () => {
        const res = await request(baseUrl)
            .get('/budgets')
            .set('session-token', sessionToken)
            .send();

        expect(res.body.data.length).toBeGreaterThan(0);
        expect(res.status).toBe(200);
    });

    test('should get budget by id', async () => {
        const res = await request(baseUrl)
            .get(`/budgets/${budgetId}`)
            .set('session-token', sessionToken)
            .send();

        expect(res.status).toBe(200);
    });

    test('should update budget', async () => {
        const res = await request(baseUrl)
            .put(`/budgets/${budgetId}`)
            .set('session-token', sessionToken)
            .send({
                "name": "Orçamento teste"
            });

        expect(res.body.data.name).toBe("Orçamento teste");
        expect(res.status).toBe(200);
    });

    test('should delete budget', async () => {
        const res = await request(baseUrl)
            .delete(`/budgets/${budgetId}`)
            .set('session-token', sessionToken)
            .send();

        expect(res.status).toBe(200);
    });
});
