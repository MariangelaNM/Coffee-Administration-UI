import { ApiResponse, createApiError } from "./api-client";

export default class HttpApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async makeApiRequest<T>(
    method: string,
    endpoint: string,
    body: Record<string, any> | null = null
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      "Content-Type": "application/json",
      "coffee-key": "4d4ee570-87bd-42bf-9bda-173f22622871",
    };
  
    try {
      const response = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        throw await createApiError(response);
      }

      const responseData: ApiResponse<T> = await response.json();
      return responseData;
    } catch (error) {
      console.error("API request failed:", error);

      // You can return an error object with details
      return { success: false, error: "API request failed" };
    }
  }
}
