import { APIRequestContext, APIResponse } from '@playwright/test';
import { log } from '../utils/logger';

const getLoggedResponse = async (
    response: APIResponse,
    endpoint: string,
    payload?: object,
    isBodyNotSecret = true
): Promise<APIResponse> => {
    log.info(`Request URL: ${endpoint}`);
    if (payload && isBodyNotSecret)
        log.info(`Request params/body:\n${JSON.stringify(payload, null, 2)}`);
    log.info(`Response status: ${response.status()}`);
    if (response.headers()['content-type']?.includes('application/json'))
        log.info(
            `Response body:\n${JSON.stringify(await response.json(), null, 2)}`
        );
    return response;
};

export const postData = async (
    request: APIRequestContext,
    endpoint: string,
    data?: object,
    headers?: { [key: string]: string }
) =>
    getLoggedResponse(
        await request.post(endpoint, {
            data,
            headers
        }),
        endpoint,
        data
    );

export const postForm = async (
    request: APIRequestContext,
    endpoint: string,
    form?: { [key: string]: string | number },
    headers?: { [key: string]: string },
    isBodyNotSecret = true
): Promise<APIResponse> => {
    return getLoggedResponse(
        await request.post(endpoint, {
            form,
            headers
        }),
        endpoint,
        form,
        isBodyNotSecret
    );
};

export const putForm = async (
    request: APIRequestContext,
    endpoint: string,
    form?: { [key: string]: string },
    headers?: { [key: string]: string },
    isBodyNotSecret = true
): Promise<APIResponse> =>
    getLoggedResponse(
        await request.put(endpoint, {
            form,
            headers
        }),
        endpoint,
        form,
        isBodyNotSecret
    );
