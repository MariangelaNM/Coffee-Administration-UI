export interface ApiError {
  description?: string;
}

export class ApiErrorBase implements ApiError {
  constructor(public description?: string) {}
}

export class BadRequest extends ApiErrorBase {}
export class Unauthorized extends ApiErrorBase {}
export class Forbidden extends ApiErrorBase {}
export class NotFound extends ApiErrorBase {}
export class PreconditionFailed extends ApiErrorBase {}
export class PreconditionRequired extends ApiErrorBase {}
export class UnprocessableEntity extends ApiErrorBase {}

export class GenericError extends ApiErrorBase {
  constructor(public httpCode: number, description: string) {
    super(description);
  }
}

export interface ApiResponse<T> {
  Nombre: string;
  Id: number | undefined;
  data: T;
}

const errorDescriptions: Record<number, string> = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  412: "Precondition Failed",
  409: "Conflict",
  422: "Unprocessable Entity",
  428: "Precondition Required",
};

export async function createApiError(
  response: Response | XMLHttpRequest
): Promise<ApiError> {
  const status = response.status;
  const description =
    errorDescriptions[status] ||
    ("text" in response ? await response.text() : "Unknown Error");

  switch (status) {
    case 400:
      return new BadRequest(description);
    case 401:
      return new Unauthorized(description);
    case 403:
      return new Forbidden(description);
    case 404:
      return new NotFound(description);
    case 412:
      return new PreconditionFailed(description);
    case 409:
    case 422:
      return new UnprocessableEntity(description);
    case 428:
      return new PreconditionRequired(description);
    default:
      return new GenericError(status, description);
  }
}
