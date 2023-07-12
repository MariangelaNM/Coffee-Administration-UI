import ApiClient, {
    ApiError,
    BadRequest,
    Forbidden,
    GenericError,
    NotFound,
    PreconditionFailed,
    PreconditionRequired,
    Unauthorized,
    UnprocessableEntity,
    UserResponse
  } from './api-client';
  
  //import { getAccessToken, removeAuthToken } from '../utils/auth';
  import { Register } from '../models/Register';
  
  async function createApiError(response: Response | XMLHttpRequest): Promise<ApiError> {
    switch (response.status) {
      case 400:
        return new BadRequest();
      case 401:
        return new Unauthorized();
      case 403:
        return new Forbidden();
      case 404:
        return new NotFound();
      case 412:
        return new PreconditionFailed();
      case 415:
      case 422:
        try {
          const detail = 'json' in response ? (await response.json()).detail : response.responseText;
          return new UnprocessableEntity(detail);
        } catch (e) {
          return new UnprocessableEntity();
        }
      case 428:
        return new PreconditionRequired();
    }
    return new GenericError(
      response.status,
      'text' in response ? await response.text() : response.responseText
    );
  }
  

  export default class HttpApiClient implements ApiClient {
    baseUrl: string;
  
    constructor(baseUrl: string) {
      this.baseUrl = baseUrl;
    }

    postUser = async (register: Register): Promise<UserResponse> => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
      const response = await fetch(this.baseUrl + 'users', {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(register)
      });
      if (!response.ok) {
        throw await createApiError(response);
      }
      return response.json();
    };
  }
  