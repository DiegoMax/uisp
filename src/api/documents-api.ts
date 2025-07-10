import { HttpClient } from "../http/http-client";
import {
  DocumentReadOnly,
  DocumentWritable,
  DocumentSearchParams,
  DocumentTemplateReadOnly,
  CustomAttributeReadOnly,
  CustomAttribute,
  CustomAttributeSearchParams,
  LocationData,
  AddressSuggestionData,
  GeocodingParams,
  AddressSuggestionParams,
  ApiResponse,
} from "../types";

export class DocumentsApi {
  constructor(private httpClient: HttpClient) {}

  /**
   * Retrieve collection of Documents
   */
  async getDocuments(
    params?: DocumentSearchParams
  ): Promise<ApiResponse<DocumentReadOnly[]>> {
    const queryString = params ? this.httpClient.buildQueryString(params) : "";
    return this.httpClient.get<DocumentReadOnly[]>(`/documents${queryString}`);
  }

  /**
   * Create Document
   */
  async createDocument(
    document: DocumentWritable
  ): Promise<ApiResponse<DocumentReadOnly>> {
    return this.httpClient.post<DocumentReadOnly, DocumentWritable>(
      "/documents",
      document
    );
  }

  /**
   * Retrieve specific Document by ID
   */
  async getDocument(id: number): Promise<ApiResponse<DocumentReadOnly>> {
    return this.httpClient.get<DocumentReadOnly>(`/documents/${id}`);
  }

  /**
   * Delete Document
   */
  async deleteDocument(id: number): Promise<ApiResponse<void>> {
    return this.httpClient.delete<void>(`/documents/${id}`);
  }

  /**
   * Retrieve Document file resource
   */
  async getDocumentFile(id: number): Promise<ArrayBuffer> {
    return this.httpClient.downloadFile(`/documents/${id}/file`);
  }
}

export class DocumentTemplatesApi {
  constructor(private httpClient: HttpClient) {}

  /**
   * Retrieve collection of Document Templates
   */
  async getDocumentTemplates(params?: {
    limit?: number;
    offset?: number;
  }): Promise<ApiResponse<DocumentTemplateReadOnly[]>> {
    const queryString = params ? this.httpClient.buildQueryString(params) : "";
    return this.httpClient.get<DocumentTemplateReadOnly[]>(
      `/document-templates${queryString}`
    );
  }

  /**
   * Retrieve specific Document Template by ID
   */
  async getDocumentTemplate(
    id: number
  ): Promise<ApiResponse<DocumentTemplateReadOnly>> {
    return this.httpClient.get<DocumentTemplateReadOnly>(
      `/document-templates/${id}`
    );
  }
}

export class CustomAttributesApi {
  constructor(private httpClient: HttpClient) {}

  /**
   * Retrieve collection of Custom Attributes
   */
  async getCustomAttributes(
    params?: CustomAttributeSearchParams
  ): Promise<ApiResponse<CustomAttributeReadOnly[]>> {
    const queryString = params ? this.httpClient.buildQueryString(params) : "";
    return this.httpClient.get<CustomAttributeReadOnly[]>(
      `/custom-attributes${queryString}`
    );
  }

  /**
   * Create Custom Attribute
   */
  async createCustomAttribute(
    attribute: CustomAttribute
  ): Promise<ApiResponse<CustomAttributeReadOnly>> {
    return this.httpClient.post<CustomAttributeReadOnly, CustomAttribute>(
      "/custom-attributes",
      attribute
    );
  }

  /**
   * Retrieve specific Custom Attribute by ID
   */
  async getCustomAttribute(
    id: number
  ): Promise<ApiResponse<CustomAttributeReadOnly>> {
    return this.httpClient.get<CustomAttributeReadOnly>(
      `/custom-attributes/${id}`
    );
  }

  /**
   * Update Custom Attribute
   */
  async updateCustomAttribute(
    id: number,
    attribute: CustomAttribute
  ): Promise<ApiResponse<CustomAttributeReadOnly>> {
    return this.httpClient.patch<CustomAttributeReadOnly, CustomAttribute>(
      `/custom-attributes/${id}`,
      attribute
    );
  }

  /**
   * Delete Custom Attribute
   */
  async deleteCustomAttribute(id: number): Promise<ApiResponse<void>> {
    return this.httpClient.delete<void>(`/custom-attributes/${id}`);
  }
}

export class GeocodingApi {
  constructor(private httpClient: HttpClient) {}

  /**
   * Geocode the provided address
   */
  async geocode(params: GeocodingParams): Promise<ApiResponse<LocationData>> {
    const queryString = this.httpClient.buildQueryString(params);
    return this.httpClient.get<LocationData>(`/geocode${queryString}`);
  }

  /**
   * Suggest addresses for the provided query
   */
  async suggestAddresses(
    params: AddressSuggestionParams
  ): Promise<ApiResponse<AddressSuggestionData[]>> {
    const queryString = this.httpClient.buildQueryString(params);
    return this.httpClient.get<AddressSuggestionData[]>(
      `/geocode/suggest${queryString}`
    );
  }
}
