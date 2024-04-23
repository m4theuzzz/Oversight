import { describe, expect, test, jest, beforeEach, beforeAll } from '@jest/globals';
import * as request from 'supertest';

describe('Test services', () => {
    const baseUrl = 'http://localhost:3000';
    const mockEmail = "matvsan@gmail.com";
    const mockPass = "hixbek-rapNib-semri3";
    let sessionToken = '';
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
    });

    beforeEach(() => {
        jest.resetAllMocks();
        jest.resetModules();
        jest.setTimeout(60000);
    });

    test('should create service', async () => {
        const res = await request(baseUrl)
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

        serviceId = res.body.data.id;
        expect(res.body.data.name).toBe("Aula de Matemática");
        expect(res.status).toBe(200);
    });

    test('should get all services', async () => {
        const res = await request(baseUrl)
            .get('/services')
            .set('session-token', sessionToken)
            .send();

        expect(res.body.data.length).toBeGreaterThan(0);
        expect(res.status).toBe(200);
    });

    test('should get service by id', async () => {
        const res = await request(baseUrl)
            .get(`/services/${serviceId}`)
            .set('session-token', sessionToken)
            .send();

        expect(res.status).toBe(200);
    });

    test('should update service', async () => {
        const res = await request(baseUrl)
            .put(`/services/${serviceId}`)
            .set('session-token', sessionToken)
            .send({
                "name": "Aula de Português"
            });

        expect(res.body.data.name).toBe("Aula de Português");
        expect(res.status).toBe(200);
    });

    test('should delete service', async () => {
        const res = await request(baseUrl)
            .delete(`/services/${serviceId}`)
            .set('session-token', sessionToken)
            .send();

        expect(res.status).toBe(200);
    });
});
