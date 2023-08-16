export interface ApiError {
  description?: string;
}

export class BadRequest implements ApiError {}

export class GenericError implements ApiError {
  constructor(httpCode: number, description: string) {
    this.httpCode = httpCode;
    this.description = description;
  }
  httpCode: number;
  description: string;
}

export class Timeout implements ApiError {}
export class Forbidden implements ApiError {}
export class Unauthorized implements ApiError {}
export class NotFound implements ApiError {}
export class UnprocessableEntity implements ApiError {
  constructor(public description?: string) {}
}
export class PreconditionFailed implements ApiError {}
export class PreconditionRequired implements ApiError {}

export interface ApiResponse<T> {
  data: T;
}

export async function createApiError(
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

