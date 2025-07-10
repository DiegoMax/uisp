import { HttpClient } from "../http/http-client";
import {
  ClientReadOnly,
  ClientWritable,
  ClientSearchParams,
  ClientCredentials,
  ClientBankAccount,
  ClientBankAccountReadOnly,
  ClientContactWritable,
  ClientContactReadOnly,
  ClientLogsWritable,
  ClientLogsReadOnly,
  ClientLogsSearchParams,
  ClientTag,
  ClientTagReadOnly,
  ApiResponse,
} from "../types";

export class ClientsApi {
  constructor(private httpClient: HttpClient) {}

  /**
   * Retrieve collection of Clients
   */
  async getClients(
    params?: ClientSearchParams
  ): Promise<ApiResponse<ClientReadOnly[]>> {
    const queryString = params ? this.httpClient.buildQueryString(params) : "";
    return this.httpClient.get<ClientReadOnly[]>(`/clients${queryString}`);
  }

  /**
   * Create a new Client
   */
  async createClient(
    client: ClientWritable
  ): Promise<ApiResponse<ClientReadOnly>> {
    return this.httpClient.post<ClientReadOnly, ClientWritable>(
      "/clients",
      client
    );
  }

  /**
   * Retrieve a specific Client by ID
   */
  async getClient(id: number): Promise<ApiResponse<ClientReadOnly>> {
    return this.httpClient.get<ClientReadOnly>(`/clients/${id}`);
  }

  /**
   * Update a Client
   */
  async updateClient(
    id: number,
    client: ClientWritable
  ): Promise<ApiResponse<ClientReadOnly>> {
    return this.httpClient.patch<ClientReadOnly, ClientWritable>(
      `/clients/${id}`,
      client
    );
  }

  /**
   * Delete a Client permanently
   */
  async deleteClient(id: number): Promise<ApiResponse<void>> {
    return this.httpClient.delete<void>(`/clients/${id}`);
  }

  /**
   * Add a tag to a Client
   */
  async addClientTag(
    clientId: number,
    tagId: number
  ): Promise<ApiResponse<ClientReadOnly>> {
    return this.httpClient.patch<ClientReadOnly>(
      `/clients/${clientId}/add-tag/${tagId}`
    );
  }

  /**
   * Remove a tag from a Client
   */
  async removeClientTag(
    clientId: number,
    tagId: number
  ): Promise<ApiResponse<ClientReadOnly>> {
    return this.httpClient.patch<ClientReadOnly>(
      `/clients/${clientId}/remove-tag/${tagId}`
    );
  }

  /**
   * Send an invitation email to a Client
   */
  async sendInvitation(id: number): Promise<ApiResponse<ClientReadOnly>> {
    return this.httpClient.patch<ClientReadOnly>(
      `/clients/${id}/send-invitation`
    );
  }

  /**
   * Archive a Client
   */
  async archiveClient(id: number): Promise<ApiResponse<void>> {
    return this.httpClient.patch<void>(`/clients/${id}/archive`);
  }

  /**
   * Restore an archived Client
   */
  async restoreClient(id: number): Promise<ApiResponse<void>> {
    return this.httpClient.patch<void>(`/clients/${id}/restore`);
  }

  /**
   * Find Client by valid credentials
   */
  async authenticateClient(
    credentials: ClientCredentials
  ): Promise<ApiResponse<ClientReadOnly[]>> {
    return this.httpClient.post<ClientReadOnly[], ClientCredentials>(
      "/clients/authenticated",
      credentials
    );
  }

  /**
   * Automatically geocode Client's address and update GPS coordinates
   */
  async geocodeClient(id: number): Promise<ApiResponse<ClientReadOnly>> {
    return this.httpClient.patch<ClientReadOnly>(`/clients/${id}/geocode`);
  }

  // Client Bank Accounts methods
  /**
   * Get Client Bank Account by ID
   */
  async getClientBankAccount(
    id: number
  ): Promise<ApiResponse<ClientBankAccountReadOnly>> {
    return this.httpClient.get<ClientBankAccountReadOnly>(
      `/clients/bank-accounts/${id}`
    );
  }

  /**
   * Update Client Bank Account
   */
  async updateClientBankAccount(
    id: number,
    bankAccount: ClientBankAccount
  ): Promise<ApiResponse<ClientBankAccountReadOnly>> {
    return this.httpClient.patch<ClientBankAccountReadOnly, ClientBankAccount>(
      `/clients/bank-accounts/${id}`,
      bankAccount
    );
  }

  /**
   * Delete Client Bank Account
   */
  async deleteClientBankAccount(id: number): Promise<ApiResponse<void>> {
    return this.httpClient.delete<void>(`/clients/bank-accounts/${id}`);
  }

  /**
   * Get all Bank Accounts for a Client
   */
  async getClientBankAccounts(
    clientId: number
  ): Promise<ApiResponse<ClientBankAccountReadOnly[]>> {
    return this.httpClient.get<ClientBankAccountReadOnly[]>(
      `/clients/${clientId}/bank-accounts`
    );
  }

  /**
   * Create Bank Account for a Client
   */
  async createClientBankAccount(
    clientId: number,
    bankAccount: ClientBankAccount
  ): Promise<ApiResponse<ClientBankAccountReadOnly>> {
    return this.httpClient.post<ClientBankAccountReadOnly, ClientBankAccount>(
      `/clients/${clientId}/bank-accounts`,
      bankAccount
    );
  }

  // Client Contacts methods
  /**
   * Get Client Contact by ID
   */
  async getClientContact(
    id: number
  ): Promise<ApiResponse<ClientContactReadOnly>> {
    return this.httpClient.get<ClientContactReadOnly>(
      `/clients/contacts/${id}`
    );
  }

  /**
   * Update Client Contact
   */
  async updateClientContact(
    id: number,
    contact: ClientContactWritable
  ): Promise<ApiResponse<ClientContactReadOnly>> {
    return this.httpClient.patch<ClientContactReadOnly, ClientContactWritable>(
      `/clients/contacts/${id}`,
      contact
    );
  }

  /**
   * Delete Client Contact
   */
  async deleteClientContact(id: number): Promise<ApiResponse<void>> {
    return this.httpClient.delete<void>(`/clients/contacts/${id}`);
  }

  /**
   * Get all Contacts for a Client
   */
  async getClientContacts(
    clientId: number
  ): Promise<ApiResponse<ClientContactReadOnly[]>> {
    return this.httpClient.get<ClientContactReadOnly[]>(
      `/clients/${clientId}/contacts`
    );
  }

  /**
   * Create Contact for a Client
   */
  async createClientContact(
    clientId: number,
    contact: ClientContactWritable
  ): Promise<ApiResponse<ClientContactReadOnly>> {
    return this.httpClient.post<ClientContactReadOnly, ClientContactWritable>(
      `/clients/${clientId}/contacts`,
      contact
    );
  }

  // Client Logs methods
  /**
   * Get collection of Client Logs
   */
  async getClientLogs(
    params?: ClientLogsSearchParams
  ): Promise<ApiResponse<ClientLogsReadOnly[]>> {
    const queryString = params ? this.httpClient.buildQueryString(params) : "";
    return this.httpClient.get<ClientLogsReadOnly[]>(
      `/client-logs${queryString}`
    );
  }

  /**
   * Create Client Log entry
   */
  async createClientLog(
    log: ClientLogsWritable
  ): Promise<ApiResponse<ClientLogsReadOnly>> {
    return this.httpClient.post<ClientLogsReadOnly, ClientLogsWritable>(
      "/client-logs",
      log
    );
  }

  /**
   * Get Client Log by ID
   */
  async getClientLog(id: number): Promise<ApiResponse<ClientLogsReadOnly>> {
    return this.httpClient.get<ClientLogsReadOnly>(`/client-logs/${id}`);
  }

  /**
   * Update Client Log
   */
  async updateClientLog(
    id: number,
    log: ClientLogsWritable
  ): Promise<ApiResponse<ClientLogsReadOnly>> {
    return this.httpClient.patch<ClientLogsReadOnly, ClientLogsWritable>(
      `/client-logs/${id}`,
      log
    );
  }

  /**
   * Delete Client Log
   */
  async deleteClientLog(id: number): Promise<ApiResponse<void>> {
    return this.httpClient.delete<void>(`/client-logs/${id}`);
  }

  // Client Tags methods
  /**
   * Get collection of Client Tags
   */
  async getClientTags(params?: {
    limit?: number;
    offset?: number;
  }): Promise<ApiResponse<ClientTagReadOnly[]>> {
    const queryString = params ? this.httpClient.buildQueryString(params) : "";
    return this.httpClient.get<ClientTagReadOnly[]>(
      `/client-tags${queryString}`
    );
  }

  /**
   * Create Client Tag
   */
  async createClientTag(
    tag: ClientTag
  ): Promise<ApiResponse<ClientTagReadOnly>> {
    return this.httpClient.post<ClientTagReadOnly, ClientTag>(
      "/client-tags",
      tag
    );
  }

  /**
   * Get Client Tag by ID
   */
  async getClientTag(id: number): Promise<ApiResponse<ClientTagReadOnly>> {
    return this.httpClient.get<ClientTagReadOnly>(`/client-tags/${id}`);
  }

  /**
   * Update Client Tag
   */
  async updateClientTag(
    id: number,
    tag: ClientTag
  ): Promise<ApiResponse<ClientTagReadOnly>> {
    return this.httpClient.patch<ClientTagReadOnly, ClientTag>(
      `/client-tags/${id}`,
      tag
    );
  }

  /**
   * Delete Client Tag
   */
  async deleteClientTag(id: number): Promise<ApiResponse<void>> {
    return this.httpClient.delete<void>(`/client-tags/${id}`);
  }
}
