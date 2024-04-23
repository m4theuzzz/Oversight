import { describe, expect, test, jest, beforeEach, beforeAll, afterAll } from '@jest/globals';
import * as request from 'supertest';

describe('Test budget services', () => {
    const baseUrl = 'http://localhost:3000';
    const mockEmail = "matvsan@gmail.com";
    const mockPass = "hixbek-rapNib-semri3";
    let sessionToken = '';
    let addressId = '';
    let customerId = '';
    let budgetId = '';
    let serviceId = '';

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

        const budget = await request(baseUrl)
            .post('/budgets')
            .set('session-token', sessionToken)
            .send({
                "customerId": customerId,
                "name": "Orçamento do maluco q mora logo ali",
                "description": "descrição",
                "incomingMargin": 15,
                "status": "budgeting"
            });

        budgetId = budget.body.data.id;

        const service = await request(baseUrl)
            .post('/services')
            .set('session-token', sessionToken)
            .send({
                "name": "Aula de Matemática",
                "description": "",
                "mesureUnit": "hour",
                "value": 60,
                "type": "service",
                "errorMargin": 0
            });

        serviceId = service.body.data.id;
    });

    afterAll(async () => {
        await request(baseUrl)
            .delete(`/customers/${customerId}`)
            .set('session-token', sessionToken)
            .send();

        await request(baseUrl)
            .delete(`/budgets/${budgetId}`)
            .set('session-token', sessionToken)
            .send();

        await request(baseUrl)
            .delete(`/services/${serviceId}`)
            .set('session-token', sessionToken)
            .send();
    });

    beforeEach(() => {
        jest.setTimeout(60000);
        jest.resetAllMocks();
        jest.resetModules();
    });

    test('should add budget service', async () => {
        const res = await request(baseUrl)
            .post(`/budgets/${budgetId}/services`)
            .set('session-token', sessionToken)
            .send({
                "serviceId": serviceId,
                "quantity": 3,
                "budgetedUnitValue": 666
            });

        addressId = res.body.data.id;
        expect(res.body.data.quantity).toBe(3);
        expect(res.status).toBe(200);
    });

    test('should get all budget services', async () => {
        const res = await request(baseUrl)
            .get(`/budgets/${budgetId}/services`)
            .set('session-token', sessionToken)
            .send();

        expect(res.body.data.length).toBeGreaterThan(0);
        expect(res.status).toBe(200);
    });

    test('should update budget service', async () => {
        const res = await request(baseUrl)
            .put(`/budgets/${budgetId}/services/${serviceId}`)
            .set('session-token', sessionToken)
            .send({
                "quantity": 4,
            });

        expect(res.body.data.quantity).toBe(4);
        expect(res.status).toBe(200);
    });

    test('should delete budget service', async () => {
        const res = await request(baseUrl)
            .delete(`/budgets/${budgetId}/services/${serviceId}`)
            .set('session-token', sessionToken)
            .send();

        expect(res.status).toBe(200);
    });
});
