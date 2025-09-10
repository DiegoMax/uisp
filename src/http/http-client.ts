import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { UispCrmConfig, RequestConfig, ApiResponse } from "../types";
import {
  UispAuthenticationError,
  UispPermissionError,
  UispNotFoundError,
  UispValidationError,
  UispRateLimitError,
  UispServerError,
  UispServiceUnavailableError,
  UispNetworkError,
  UispCrmError,
} from "../errors";

export class HttpClient {
  private client: AxiosInstance;
  private config: UispCrmConfig;

  constructor(config: UispCrmConfig) {
    this.config = config;
    this.client = axios.create({
      baseURL: config.baseUrl,
      timeout: config.timeout || 30000,
      headers: {
        "Content-Type": "application/json",
        "X-Auth-App-Key": config.appKey,
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.client.interceptors.request.use(
      (config: any) => {
        return config;
      },
      (error: any) => {
        // Log only essential info, no stack traces
        if (process.env.NODE_ENV === "development") {
          console.error("Request setup failed:", error.message || "Unknown error");
        }
        return Promise.reject(this.sanitizeError(error, "Request configuration failed"));
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response: any) => {
        return response;
      },
      (error: any) => {
        // Handle common error cases without exposing internal details
        if (error.response) {
          const { status, statusText, data } = error.response;

          switch (status) {
            case 401:
              throw new UispAuthenticationError();
            case 403:
              throw new UispPermissionError();
            case 404:
              throw new UispNotFoundError(data?.message || statusText);
            case 422:
              throw new UispValidationError(data?.message || statusText);
            case 429:
              throw new UispRateLimitError();
            case 500:
              throw new UispServerError();
            case 502:
            case 503:
            case 504:
              throw new UispServiceUnavailableError();
            default:
              throw new UispCrmError(`HTTP ${status}: ${data?.message || statusText}`, "HTTP_ERROR", status);
          }
        } else if (error.request) {
          throw new UispNetworkError();
        } else {
          throw new UispCrmError("Request failed: Please check your configuration", "REQUEST_ERROR");
        }
      }
    );
  }

  /**
   * Sanitize error to prevent stack trace exposure
   */
  private sanitizeError(originalError: unknown, fallbackMessage: string): UispCrmError {
    if (originalError instanceof UispCrmError) {
      return originalError;
    }

    const message = originalError instanceof Error ? originalError.message : fallbackMessage;
    return new UispCrmError(message, "SANITIZED_ERROR");
  }

  async get<T>(url: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.get<T>(url, this.buildRequestConfig(config));
    return this.transformResponse(response);
  }

  async post<T, D = any>(url: string, data?: D, config?: RequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.post<T>(url, data, this.buildRequestConfig(config));
    return this.transformResponse(response);
  }

  async patch<T, D = any>(url: string, data?: D, config?: RequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.patch<T>(url, data, this.buildRequestConfig(config));
    return this.transformResponse(response);
  }

  async put<T, D = any>(url: string, data?: D, config?: RequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.put<T>(url, data, this.buildRequestConfig(config));
    return this.transformResponse(response);
  }

  async delete<T>(url: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.delete<T>(url, this.buildRequestConfig(config));
    return this.transformResponse(response);
  }

  // Special method for file downloads (PDFs, documents, etc.)
  async downloadFile(url: string, config?: RequestConfig): Promise<ArrayBuffer> {
    const response = await this.client.get(url, {
      ...this.buildRequestConfig(config),
      responseType: "arraybuffer",
    });
    return response.data;
  }

  private buildRequestConfig(config?: RequestConfig): AxiosRequestConfig {
    return {
      headers: {
        ...config?.headers,
      },
      timeout: config?.timeout || this.config.timeout,
    };
  }

  private transformResponse<T>(response: AxiosResponse<T>): ApiResponse<T> {
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    };
  }

  // Helper method to build query string from parameters
  buildQueryString(params: Record<string, any>): string {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          // Handle array parameters (e.g., statuses[], clientTagIds[])
          value.forEach((item) => {
            if (key.endsWith("[]") || key.endsWith("%5B%5D")) {
              searchParams.append(key, String(item));
            } else {
              searchParams.append(`${key}[]`, String(item));
            }
          });
        } else {
          searchParams.append(key, String(value));
        }
      }
    });

    const queryString = searchParams.toString();
    return queryString ? `?${queryString}` : "";
  }
}
