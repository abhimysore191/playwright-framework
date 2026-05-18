import { APIRequestContext } from '@playwright/test';
import { PracticeAppEndpoints } from './endpoint';

import * as BaseRequest from '../api/base-request';

export class CustomerRegistrationApi {
    readonly request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async postCustomerRegistration(payload: {
        first_name: string;
        last_name: string;
        dob: string;
        phone: string;
        email: string;
        password: string;
        address: {
            street: string;
            city: string;
            state: string;
            country: string;
            postal_code: string;
        };
    }) {
        return await BaseRequest.postData(
            this.request,
            PracticeAppEndpoints.Users.Register.Base,
            payload,
            {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                Origin: 'https://practicesoftwaretesting.com',
                Referer: 'https://practicesoftwaretesting.com/'
            }
        );
    }
}
