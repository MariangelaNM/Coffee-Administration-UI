import HttpApiClient from './http-api-client';

const BASE_URL = 'https://coffee-administration-test.onrender.com' ;


export default function createApiClient() {
    return new HttpApiClient(BASE_URL);
}
export interface ApiResponse<T> {
    Nombre?: string;
    Id?: number | undefined;
    data?: T;
    message: string| undefined;
  }
  