/**
 * Error types for UISP CRM Client
 */

export class UispCrmError extends Error {
  public readonly code: string;
  public readonly statusCode?: number;

  constructor(message: string, code: string = "UISP_ERROR", statusCode?: number) {
    super(message);
    this.name = "UispCrmError";
    this.code = code;
    this.statusCode = statusCode;

    // Don't expose stack trace in production
    if (process.env.NODE_ENV !== "development") {
      this.stack = undefined;
    }
  }
}

export class UispNetworkError extends UispCrmError {
  constructor(message: string = "Unable to connect to UISP server") {
    super(message, "NETWORK_ERROR");
  }
}

export class UispAuthenticationError extends UispCrmError {
  constructor(message: string = "Invalid or missing app key") {
    super(message, "AUTH_ERROR", 401);
  }
}

export class UispPermissionError extends UispCrmError {
  constructor(message: string = "App key does not have required permissions") {
    super(message, "PERMISSION_ERROR", 403);
  }
}

export class UispNotFoundError extends UispCrmError {
  constructor(message: string = "Resource not found") {
    super(message, "NOT_FOUND_ERROR", 404);
  }
}

export class UispValidationError extends UispCrmError {
  constructor(message: string = "Validation failed") {
    super(message, "VALIDATION_ERROR", 422);
  }
}

export class UispRateLimitError extends UispCrmError {
  constructor(message: string = "Rate limit exceeded. Please try again later") {
    super(message, "RATE_LIMIT_ERROR", 429);
  }
}

export class UispServerError extends UispCrmError {
  constructor(message: string = "Server error. Please try again later") {
    super(message, "SERVER_ERROR", 500);
  }
}

export class UispServiceUnavailableError extends UispCrmError {
  constructor(message: string = "Service temporarily unavailable. Please try again later") {
    super(message, "SERVICE_UNAVAILABLE_ERROR", 503);
  }
}
