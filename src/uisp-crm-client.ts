import { HttpClient } from "./http/http-client";
import { UispCrmConfig } from "./types";
import { ClientsApi } from "./api/clients-api";
import { ServicesApi } from "./api/services-api";
import { InvoicesApi } from "./api/invoices-api";
import { CreditNotesApi } from "./api/credit-notes-api";
import {
  OrganizationsApi,
  PaymentMethodsApi,
  PaymentPlansApi,
  FeesApi,
} from "./api/organizations-api";
import {
  DocumentsApi,
  DocumentTemplatesApi,
  CustomAttributesApi,
  GeocodingApi,
} from "./api/documents-api";
import {
  JobsApi,
  JobCommentsApi,
  JobTasksApi,
  JobAttachmentsApi,
} from "./api/jobs-api";

/**
 * Main UISP CRM API Client
 *
 * This class provides access to all UISP CRM API endpoints through organized API classes.
 *
 * @example
 * ```typescript
 * import { UispCrmClient } from 'uisp-crm-api';
 *
 * const client = new UispCrmClient({
 *   baseUrl: 'https://your-uisp-instance.com/crm/api/v1.0',
 *   appKey: 'your-app-key-here'
 * });
 *
 * // Get all clients
 * const clients = await client.clients.getClients();
 *
 * // Create a new client
 * const newClient = await client.clients.createClient({
 *   firstName: 'John',
 *   lastName: 'Doe',
 *   email: 'john.doe@example.com'
 * });
 *
 * // Get all services
 * const services = await client.services.getServices();
 *
 * // Create a service for a client
 * const newService = await client.services.createService(clientId, {
 *   name: 'Internet Service',
 *   price: 29.99
 * });
 * ```
 */
export class UispCrmClient {
  private httpClient: HttpClient;

  // API endpoint groups
  public readonly clients: ClientsApi;
  public readonly services: ServicesApi;
  public readonly invoices: InvoicesApi;
  public readonly creditNotes: CreditNotesApi;
  public readonly organizations: OrganizationsApi;
  public readonly paymentMethods: PaymentMethodsApi;
  public readonly paymentPlans: PaymentPlansApi;
  public readonly fees: FeesApi;
  public readonly documents: DocumentsApi;
  public readonly documentTemplates: DocumentTemplatesApi;
  public readonly customAttributes: CustomAttributesApi;
  public readonly geocoding: GeocodingApi;
  public readonly jobs: JobsApi;
  public readonly jobComments: JobCommentsApi;
  public readonly jobTasks: JobTasksApi;
  public readonly jobAttachments: JobAttachmentsApi;

  /**
   * Create a new UISP CRM API client
   *
   * @param config Configuration object containing base URL and app key
   */
  constructor(config: UispCrmConfig) {
    // Validate configuration
    if (!config.baseUrl) {
      throw new Error("baseUrl is required in UispCrmConfig");
    }
    if (!config.appKey) {
      throw new Error("appKey is required in UispCrmConfig");
    }

    // Remove trailing slash from baseUrl if present
    const normalizedConfig = {
      ...config,
      baseUrl: config.baseUrl.replace(/\/$/, ""),
    };

    this.httpClient = new HttpClient(normalizedConfig);

    // Initialize API classes
    this.clients = new ClientsApi(this.httpClient);
    this.services = new ServicesApi(this.httpClient);
    this.invoices = new InvoicesApi(this.httpClient);
    this.creditNotes = new CreditNotesApi(this.httpClient);
    this.organizations = new OrganizationsApi(this.httpClient);
    this.paymentMethods = new PaymentMethodsApi(this.httpClient);
    this.paymentPlans = new PaymentPlansApi(this.httpClient);
    this.fees = new FeesApi(this.httpClient);
    this.documents = new DocumentsApi(this.httpClient);
    this.documentTemplates = new DocumentTemplatesApi(this.httpClient);
    this.customAttributes = new CustomAttributesApi(this.httpClient);
    this.geocoding = new GeocodingApi(this.httpClient);
    this.jobs = new JobsApi(this.httpClient);
    this.jobComments = new JobCommentsApi(this.httpClient);
    this.jobTasks = new JobTasksApi(this.httpClient);
    this.jobAttachments = new JobAttachmentsApi(this.httpClient);
  }

  /**
   * Get the current configuration
   */
  getConfig(): UispCrmConfig {
    return { ...this.httpClient["config"] };
  }

  /**
   * Test the API connection by making a simple request
   * This will attempt to fetch organizations to verify the connection and authentication
   */
  async testConnection(): Promise<boolean> {
    try {
      await this.organizations.getOrganizations();
      return true;
    } catch (error) {
      console.error("Connection test failed:", error);
      return false;
    }
  }
}
