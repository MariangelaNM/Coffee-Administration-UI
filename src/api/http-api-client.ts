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
  UserResponse,
} from "./api-client";

//import { getAccessToken, removeAuthToken } from '../utils/auth';
import { User } from "../models/User";

async function createApiError(
  response: Response | XMLHttpRequest
): Promise<ApiError> {
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
    case 409:
      try {
        const detail =
          "json" in response
            ? (await response.json()).message
            : response.responseText;
        return new UnprocessableEntity(detail);
      } catch {
        return new UnprocessableEntity();
      }
    case 422:
      try {
        const detail =
          "json" in response
            ? (await response.json()).detail
            : response.responseText;
        return new UnprocessableEntity(detail);
      } catch (e) {
        return new UnprocessableEntity();
      }
    case 428:
      return new PreconditionRequired();
  }
  return new GenericError(
    response.status,
    "text" in response ? await response.text() : response.responseText
  );
}

export default class HttpApiClient implements ApiClient {
  baseUrl: string;

  //apiKey = process.env.NODE_ENV + "";
  apiKey = "4d4ee570-87bd-42bf-9bda-173f22622871";



  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  postUser = async (user: User): Promise<UserResponse> => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const response = await fetch(this.baseUrl + "/users", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "coffee-key": this.apiKey,
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw await createApiError(response);
    }
    return response.json();
  };
}
