import { BaseEntity } from "./base";

// Document types
export interface DocumentWritable {
  clientId?: number;
  name?: string;
  file?: string; // Base64 encoded file content
  size?: number;
  mimeType?: string;
}

export interface DocumentReadOnly extends BaseEntity {
  clientId: number | null;
  name: string;
  size: number;
  mimeType: string;
  type: string;
}

export interface DocumentSearchParams {
  clientId?: number;
  types?: string[];
  limit?: number;
  offset?: number;
}

// Document Template types
export interface DocumentTemplateReadOnly extends BaseEntity {
  organizationId: number;
  name: string;
  type: string;
  createdDate: string;
  isValid: boolean;
}

// Custom Attribute types
export interface CustomAttribute {
  name?: string;
  attributeType?: string;
  key?: string;
}

export interface CustomAttributeReadOnly extends BaseEntity {
  name: string;
  attributeType: string;
  key: string;
}

export interface CustomAttributeSearchParams {
  attributeType?: string;
  limit?: number;
  offset?: number;
}

// Geocoding types
export interface LocationData {
  lat: number;
  lon: number;
  address: string;
  country: string | null;
  state: string | null;
  city: string | null;
  zipCode: string | null;
}

export interface AddressSuggestionData {
  id: string;
  address: string;
  country: string | null;
  state: string | null;
  city: string | null;
  zipCode: string | null;
}

export interface GeocodingParams {
  address?: string;
  lat?: string;
  lon?: string;
}

export interface AddressSuggestionParams {
  query?: string;
  lat?: string;
  lon?: string;
  sessionToken?: string;
}

// Email types
export interface Email {
  subject?: string;
  body?: string;
  to?: string[];
  cc?: string[];
  bcc?: string[];
  attachments?: EmailAttachment[];
}

export interface EmailAttachment {
  filename?: string;
  content?: string; // Base64 encoded content
  contentType?: string;
}
