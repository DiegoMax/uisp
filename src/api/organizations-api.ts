import { HttpClient } from "../http/http-client";
import {
  OrganizationReadOnly,
  OrganizationWritable,
  NextInvoiceNumber,
  NextProformaInvoiceNumber,
  NextQuoteNumber,
  PaymentMethodReadOnly,
  PaymentMethodWritable,
  PaymentMethodSearchParams,
  PaymentPlanReadOnly,
  PaymentPlanWritable,
  Fee,
  FeeSearchParams,
  Email,
  ApiResponse,
} from "../types";

export class OrganizationsApi {
  constructor(private httpClient: HttpClient) {}

  /**
   * Retrieve collection of Organizations
   */
  async getOrganizations(): Promise<ApiResponse<OrganizationReadOnly[]>> {
    return this.httpClient.get<OrganizationReadOnly[]>("/organizations");
  }

  /**
   * Create Organization
   */
  async createOrganization(
    organization: OrganizationWritable
  ): Promise<ApiResponse<OrganizationReadOnly>> {
    return this.httpClient.post<OrganizationReadOnly, OrganizationWritable>(
      "/organizations",
      organization
    );
  }

  /**
   * Retrieve specific Organization by ID
   */
  async getOrganization(
    id: number
  ): Promise<ApiResponse<OrganizationReadOnly>> {
    return this.httpClient.get<OrganizationReadOnly>(`/organizations/${id}`);
  }

  /**
   * Update Organization
   */
  async updateOrganization(
    id: number,
    organization: OrganizationWritable
  ): Promise<ApiResponse<OrganizationReadOnly>> {
    return this.httpClient.patch<OrganizationReadOnly, OrganizationWritable>(
      `/organizations/${id}`,
      organization
    );
  }

  /**
   * Delete Organization
   */
  async deleteOrganization(id: number): Promise<ApiResponse<void>> {
    return this.httpClient.delete<void>(`/organizations/${id}`);
  }

  /**
   * Get next invoice number for Organization
   */
  async getNextInvoiceNumber(
    id: number
  ): Promise<ApiResponse<NextInvoiceNumber>> {
    return this.httpClient.get<NextInvoiceNumber>(
      `/organizations/${id}/next-invoice-number`
    );
  }

  /**
   * Get next proforma invoice number for Organization
   */
  async getNextProformaInvoiceNumber(
    id: number
  ): Promise<ApiResponse<NextProformaInvoiceNumber>> {
    return this.httpClient.get<NextProformaInvoiceNumber>(
      `/organizations/${id}/next-proforma-invoice-number`
    );
  }

  /**
   * Get next quote number for Organization
   */
  async getNextQuoteNumber(id: number): Promise<ApiResponse<NextQuoteNumber>> {
    return this.httpClient.get<NextQuoteNumber>(
      `/organizations/${id}/next-quote-number`
    );
  }

  /**
   * Enqueue email message to be sent by Organization
   */
  async enqueueEmail(
    organizationId: number,
    email: Email
  ): Promise<ApiResponse<void>> {
    return this.httpClient.post<void, Email>(
      `/email/${organizationId}/enqueue`,
      email
    );
  }
}

export class PaymentMethodsApi {
  constructor(private httpClient: HttpClient) {}

  /**
   * Retrieve collection of Payment Methods
   */
  async getPaymentMethods(
    params?: PaymentMethodSearchParams
  ): Promise<ApiResponse<PaymentMethodReadOnly[]>> {
    const queryString = params ? this.httpClient.buildQueryString(params) : "";
    return this.httpClient.get<PaymentMethodReadOnly[]>(
      `/payment-methods${queryString}`
    );
  }

  /**
   * Create Payment Method
   */
  async createPaymentMethod(
    paymentMethod: PaymentMethodWritable
  ): Promise<ApiResponse<PaymentMethodReadOnly>> {
    return this.httpClient.post<PaymentMethodReadOnly, PaymentMethodWritable>(
      "/payment-methods",
      paymentMethod
    );
  }

  /**
   * Retrieve specific Payment Method by ID
   */
  async getPaymentMethod(
    id: number
  ): Promise<ApiResponse<PaymentMethodReadOnly>> {
    return this.httpClient.get<PaymentMethodReadOnly>(`/payment-methods/${id}`);
  }

  /**
   * Update Payment Method
   */
  async updatePaymentMethod(
    id: number,
    paymentMethod: PaymentMethodWritable
  ): Promise<ApiResponse<PaymentMethodReadOnly>> {
    return this.httpClient.patch<PaymentMethodReadOnly, PaymentMethodWritable>(
      `/payment-methods/${id}`,
      paymentMethod
    );
  }

  /**
   * Delete Payment Method
   */
  async deletePaymentMethod(id: number): Promise<ApiResponse<void>> {
    return this.httpClient.delete<void>(`/payment-methods/${id}`);
  }
}

export class PaymentPlansApi {
  constructor(private httpClient: HttpClient) {}

  /**
   * Retrieve collection of Payment Plans
   */
  async getPaymentPlans(): Promise<ApiResponse<PaymentPlanReadOnly[]>> {
    return this.httpClient.get<PaymentPlanReadOnly[]>("/payment-plans");
  }

  /**
   * Create Payment Plan
   */
  async createPaymentPlan(
    paymentPlan: PaymentPlanWritable
  ): Promise<ApiResponse<PaymentPlanReadOnly>> {
    return this.httpClient.post<PaymentPlanReadOnly, PaymentPlanWritable>(
      "/payment-plans",
      paymentPlan
    );
  }

  /**
   * Retrieve specific Payment Plan by ID
   */
  async getPaymentPlan(id: number): Promise<ApiResponse<PaymentPlanReadOnly>> {
    return this.httpClient.get<PaymentPlanReadOnly>(`/payment-plans/${id}`);
  }

  /**
   * Cancel Payment Plan
   */
  async cancelPaymentPlan(id: number): Promise<ApiResponse<void>> {
    return this.httpClient.patch<void>(`/payment-plans/${id}/cancel`);
  }
}

export class FeesApi {
  constructor(private httpClient: HttpClient) {}

  /**
   * Retrieve collection of Fees
   */
  async getFees(params?: FeeSearchParams): Promise<ApiResponse<Fee[]>> {
    const queryString = params ? this.httpClient.buildQueryString(params) : "";
    return this.httpClient.get<Fee[]>(`/fees${queryString}`);
  }

  /**
   * Retrieve specific Fee by ID
   */
  async getFee(id: number): Promise<ApiResponse<Fee>> {
    return this.httpClient.get<Fee>(`/fees/${id}`);
  }

  /**
   * Delete Fee (only uninvoiced fees and fees not present on a quote can be deleted)
   */
  async deleteFee(id: number): Promise<ApiResponse<void>> {
    return this.httpClient.delete<void>(`/fees/${id}`);
  }
}
