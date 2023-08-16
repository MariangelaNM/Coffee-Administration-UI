import HttpApiClient from './http-api-client';

const BASE_URL = 'http://localhost:3000';

export default function createApiClient() {
    return new HttpApiClient(BASE_URL);
}

