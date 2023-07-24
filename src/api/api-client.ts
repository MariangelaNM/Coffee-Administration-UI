import { Register } from "../models/Register";
import { User } from "../models/User";

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

export interface UserResponse  {
  user: User;
}

export default interface ApiClient {
  postUser(user:User): Promise<UserResponse>;
}
