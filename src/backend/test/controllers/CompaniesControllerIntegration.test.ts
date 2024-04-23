import { describe, expect, test, jest, beforeEach, beforeAll } from '@jest/globals';
import * as request from 'supertest';

describe('Test companies', () => {
    const baseUrl = 'http://localhost:3000';
    const mockEmail = "matvsan@gmail.com";
    const mockPass = "hixbek-rapNib-semri3";
    let sessionToken = '';
    let companyId = '';

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

    test('should create company', async () => {
        const res = await request(baseUrl)
            .post('/companies')
            .set('session-token', sessionToken)
            .send({
                "name": "Company test",
                "email": "company@gmail.com",
                "cnpj": 1234567891011,
                "phone": 312123123
            });

        companyId = res.body.data.id;
        expect(res.body.data.name).toBe("Company test");
        expect(res.status).toBe(200);
    });

    test('should get all companies', async () => {
        const res = await request(baseUrl)
            .get('/companies')
            .set('session-token', sessionToken)
            .send();

        expect(res.body.data.length).toBeGreaterThan(0);
        expect(res.status).toBe(200);
    });

    test('should get company by id', async () => {
        const res = await request(baseUrl)
            .get(`/companies/${companyId}`)
            .set('session-token', sessionToken)
            .send();

        expect(res.status).toBe(200);
    });

    test('should update company', async () => {
        const res = await request(baseUrl)
            .put(`/companies/${companyId}`)
            .set('session-token', sessionToken)
            .send({
                "name": "Company GG"
            });

        expect(res.body.data.name).toBe("Company GG");
        expect(res.status).toBe(200);
    });

    test('should delete company', async () => {
        const res = await request(baseUrl)
            .delete(`/companies/${companyId}`)
            .set('session-token', sessionToken)
            .send();

        expect(res.status).toBe(200);
    });
});
