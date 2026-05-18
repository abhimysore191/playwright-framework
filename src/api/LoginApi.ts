import { APIRequestContext } from '@playwright/test';
import { PracticeAppEndpoints } from './endpoint';
import * as BaseRequest from './base-request';
import '../utils/decorators/step.decorators';

export class LoginApi {
    readonly request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async postCredentials(email: string, password: string) {
        return await BaseRequest.postForm(
            this.request,
            PracticeAppEndpoints.Users.Login.Base,
            {
                email: email,
                password: password
            },
            {
                Host: 'api.practicesoftwaretesting.com'
            },
            false
        );
    }
}
