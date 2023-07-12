import HttpApiClient from './http-api-client';
import ApiClient from './api-client';

export default function createApiClient(): ApiClient {
    return new HttpApiClient('http://localhost:3000');
}
