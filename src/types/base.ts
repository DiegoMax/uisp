// Base types for common patterns in the API

export interface BaseEntity {
  id: number;
  createdDate?: string;
  modifiedDate?: string;
}

export interface PaginationParams {
  limit?: number;
  offset?: number;
}

export interface OrderingParams {
  order?: string;
  direction?: "ASC" | "DESC";
}

export interface DateRangeParams {
  createdDateFrom?: string;
  createdDateTo?: string;
}

// Error types
export interface Error400 {
  message: string;
  errors?: Record<string, string[]>;
}

export interface Error404 {
  message: string;
}

export interface Error422 {
  message: string;
  errors?: Record<string, string[]>;
}

// Common response wrapper
export interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
}

// Enum types
export enum FeeType {
  LATE_FEE = 1,
  SETUP_FEE = 2,
  EARLY_TERMINATION_FEE = 3,
}

export enum DocumentType {
  DOCUMENT = "document",
  IMAGE = "image",
  OTHER = "other",
}

export enum CustomAttributeType {
  CLIENT = "client",
  INVOICE = "invoice",
  PAYMENT = "payment",
  SERVICE = "service",
}

export enum ClientOrderBy {
  USER_FIRST_NAME = "user.firstName",
  USER_LAST_NAME = "user.lastName",
  CLIENT_REGISTRATION_DATE = "client.registrationDate",
  CLIENT_ID = "client.id",
}

export enum CreditNoteOrderBy {
  CLIENT_FIRST_NAME = "clientFirstName",
  CLIENT_LAST_NAME = "clientLastName",
  CREATED_DATE = "createdDate",
  NUMBER = "number",
}

export enum InvoiceOrderBy {
  CLIENT_LAST_NAME = "clientLastName",
  CREATED_DATE = "createdDate",
  NUMBER = "number",
}

export type InvoiceStatus = number; // This would need specific values from actual API

// Configuration interface
export interface UispCrmConfig {
  baseUrl: string;
  appKey: string;
  timeout?: number;
  retries?: number;
}

// Request configuration
export interface RequestConfig {
  headers?: Record<string, string>;
  timeout?: number;
  retries?: number;
}
