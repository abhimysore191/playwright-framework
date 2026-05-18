import test, { expect } from '@playwright/test';
import { LoginApi } from '../api/LoginApi';
import { CustomerRegistrationApi } from '../api/CustomerRegistrationApi';
import { log } from '../utils/logger';
import { PayloadGenerator } from '../generators/payloadGenerator';

test.describe('API Tests', () => {
    test('Login API - Valid Credentials', async ({ request }) => {
        const loginApi = new LoginApi(request);
        const response = await loginApi.postCredentials(
            process.env.EMAIL!,
            process.env.PASSWORD!
        );
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        const accessToken = responseBody.access_token;
        log.info(accessToken);
        expect(responseBody).toHaveProperty('access_token');
    });

    test('Login API - Invalid Credentials', async ({ request }) => {
        const loginApi = new LoginApi(request);
        const response = await loginApi.postCredentials(
            'invalid@example.com',
            'invalidpassword'
        );
        expect(response.status()).toBe(401);
    });

    test('User registration ', async ({ request }) => {
        const customerRegistrationApi = new CustomerRegistrationApi(request);
        const response = await customerRegistrationApi.postCustomerRegistration(
            PayloadGenerator.generateRegisterPayload()
        );
        expect(response.status()).toBe(201);
    });
});
