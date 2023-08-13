import { NULL } from "sass";
import {  ApiResponse, createApiError } from "./api-client";

export default class HttpApiClient {
  baseUrl: string;

  apiKey = "4d4ee570-87bd-42bf-9bda-173f22622871";

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async makeApiRequest<T>(
    method: string,
    endpoint: string,
    body: string,
    expectedType: T
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      "Content-Type": "application/json",
      "coffee-key": this.apiKey,
    };
  
    try {
      const response = await fetch(url, {
        method,
        headers,
        body: body,
      });
  
      if (!response.ok) {
        createApiError(response);
      }
  
      const responseData = await response.json();
      console.log(responseData)
      return responseData as ApiResponse<T>;
    } catch (error) {
      
      return { error: "API request failed" };
    
    }
  }
}  
