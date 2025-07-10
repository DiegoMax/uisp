import { HttpClient } from "../http/http-client";
import {
  InvoiceReadOnly,
  InvoiceNew,
  InvoiceUpdate,
  InvoiceReadOnlyPreview,
  InvoiceSearchParams,
  InvoiceTemplateReadOnly,
  InvoiceItemReadOnly,
  InvoiceItemWritable,
  ApiResponse,
} from "../types";

export class InvoicesApi {
  constructor(private httpClient: HttpClient) {}

  /**
   * Retrieve collection of Invoices
   */
  async getInvoices(
    params?: InvoiceSearchParams
  ): Promise<ApiResponse<InvoiceReadOnly[]>> {
    const queryString = params ? this.httpClient.buildQueryString(params) : "";
    return this.httpClient.get<InvoiceReadOnly[]>(`/invoices${queryString}`);
  }

  /**
   * Retrieve specific Invoice by ID
   */
  async getInvoice(id: number): Promise<ApiResponse<InvoiceReadOnly>> {
    return this.httpClient.get<InvoiceReadOnly>(`/invoices/${id}`);
  }

  /**
   * Update Invoice
   */
  async updateInvoice(
    id: number,
    invoice: InvoiceUpdate
  ): Promise<ApiResponse<InvoiceReadOnly>> {
    return this.httpClient.patch<InvoiceReadOnly, InvoiceUpdate>(
      `/invoices/${id}`,
      invoice
    );
  }

  /**
   * Delete Invoice permanently
   */
  async deleteInvoice(id: number): Promise<ApiResponse<void>> {
    return this.httpClient.delete<void>(`/invoices/${id}`);
  }

  /**
   * Create Invoice for Client
   */
  async createInvoiceForClient(
    clientId: number,
    invoice: InvoiceNew
  ): Promise<ApiResponse<InvoiceReadOnly>> {
    return this.httpClient.post<InvoiceReadOnly, InvoiceNew>(
      `/clients/${clientId}/invoices`,
      invoice
    );
  }

  /**
   * Generate preview for Invoice
   */
  async generateInvoicePreview(
    clientId: number,
    invoice: InvoiceUpdate
  ): Promise<ApiResponse<InvoiceReadOnlyPreview>> {
    return this.httpClient.post<InvoiceReadOnlyPreview, InvoiceUpdate>(
      `/clients/${clientId}/invoice-preview`,
      invoice
    );
  }

  /**
   * Approve draft Invoice
   */
  async approveInvoice(id: number): Promise<ApiResponse<InvoiceReadOnly>> {
    return this.httpClient.patch<InvoiceReadOnly>(`/invoices/${id}/approve`);
  }

  /**
   * Send Invoice to client
   */
  async sendInvoice(id: number): Promise<ApiResponse<InvoiceReadOnly>> {
    return this.httpClient.patch<InvoiceReadOnly>(`/invoices/${id}/send`);
  }

  /**
   * Regenerate PDF of Invoice
   */
  async regenerateInvoicePdf(
    id: number,
    refreshData?: boolean
  ): Promise<ApiResponse<InvoiceReadOnly>> {
    const queryString = refreshData ? "?refreshData=1" : "";
    return this.httpClient.patch<InvoiceReadOnly>(
      `/invoices/${id}/regenerate-pdf${queryString}`
    );
  }

  /**
   * Void Invoice
   */
  async voidInvoice(id: number): Promise<ApiResponse<void>> {
    return this.httpClient.patch<void>(`/invoices/${id}/void`);
  }

  /**
   * Pay Invoice with Credit Card
   */
  async payInvoiceWithCreditCard(
    invoiceId: number,
    creditCardId: string
  ): Promise<ApiResponse<void>> {
    return this.httpClient.patch<void>(
      `/invoices/${invoiceId}/pay-with-credit-card/${creditCardId}`
    );
  }

  /**
   * Retrieve Invoice PDF
   */
  async getInvoicePdf(id: number): Promise<ArrayBuffer> {
    return this.httpClient.downloadFile(`/invoices/${id}/pdf`);
  }

  // Invoice Items methods
  /**
   * Get Invoice Item by ID
   */
  async getInvoiceItem(id: number): Promise<ApiResponse<InvoiceItemReadOnly>> {
    return this.httpClient.get<InvoiceItemReadOnly>(`/invoices/items/${id}`);
  }

  /**
   * Update Invoice Item
   */
  async updateInvoiceItem(
    id: number,
    item: InvoiceItemWritable
  ): Promise<ApiResponse<InvoiceItemReadOnly>> {
    return this.httpClient.patch<InvoiceItemReadOnly, InvoiceItemWritable>(
      `/invoices/items/${id}`,
      item
    );
  }

  /**
   * Delete Invoice Item
   */
  async deleteInvoiceItem(id: number): Promise<ApiResponse<void>> {
    return this.httpClient.delete<void>(`/invoices/items/${id}`);
  }

  /**
   * Get all Invoice Items for an Invoice
   */
  async getInvoiceItems(
    invoiceId: number
  ): Promise<ApiResponse<InvoiceItemReadOnly[]>> {
    return this.httpClient.get<InvoiceItemReadOnly[]>(
      `/invoices/${invoiceId}/items`
    );
  }

  // Invoice Templates methods
  /**
   * Get collection of Invoice Templates
   */
  async getInvoiceTemplates(params?: {
    limit?: number;
    offset?: number;
  }): Promise<ApiResponse<InvoiceTemplateReadOnly[]>> {
    const queryString = params ? this.httpClient.buildQueryString(params) : "";
    return this.httpClient.get<InvoiceTemplateReadOnly[]>(
      `/invoice-templates${queryString}`
    );
  }

  /**
   * Get Invoice Template by ID
   */
  async getInvoiceTemplate(
    id: number
  ): Promise<ApiResponse<InvoiceTemplateReadOnly>> {
    return this.httpClient.get<InvoiceTemplateReadOnly>(
      `/invoice-templates/${id}`
    );
  }
}
