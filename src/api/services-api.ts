import { HttpClient } from "../http/http-client";
import {
  ServiceReadOnly,
  ServiceWritable,
  ServiceUpdate,
  ServiceSearchParams,
  ServiceActivate,
  ServicePause,
  ServiceTrafficShapingOverride,
  ServiceUsageReadonly,
  ServiceChangeRequest,
  ServiceChangeRequestReadOnly,
  PrepaidServicePeriod,
  PrepaidServicePeriodSearchParams,
  ApiResponse,
} from "../types";

export class ServicesApi {
  constructor(private httpClient: HttpClient) {}

  /**
   * Retrieve collection of Services
   */
  async getServices(
    params?: ServiceSearchParams
  ): Promise<ApiResponse<ServiceReadOnly[]>> {
    const queryString = params ? this.httpClient.buildQueryString(params) : "";
    return this.httpClient.get<ServiceReadOnly[]>(
      `/clients/services${queryString}`
    );
  }

  /**
   * Retrieve a specific Service by ID
   */
  async getService(id: number): Promise<ApiResponse<ServiceReadOnly>> {
    return this.httpClient.get<ServiceReadOnly>(`/clients/services/${id}`);
  }

  /**
   * Update a Service
   */
  async updateService(
    id: number,
    service: ServiceUpdate
  ): Promise<ApiResponse<ServiceReadOnly>> {
    return this.httpClient.patch<ServiceReadOnly, ServiceUpdate>(
      `/clients/services/${id}`,
      service
    );
  }

  /**
   * Delete a Service
   */
  async deleteService(id: number): Promise<ApiResponse<void>> {
    return this.httpClient.delete<void>(`/clients/services/${id}`);
  }

  /**
   * Create a Service for a Client
   */
  async createService(
    clientId: number,
    service: ServiceWritable
  ): Promise<ApiResponse<ServiceReadOnly>> {
    return this.httpClient.post<ServiceReadOnly, ServiceWritable>(
      `/clients/${clientId}/services`,
      service
    );
  }

  /**
   * Retrieve Service usage data for a specific period
   * Available only for recurring services
   */
  async getServiceDataUsage(
    id: number,
    datetime: string
  ): Promise<ApiResponse<ServiceUsageReadonly>> {
    return this.httpClient.get<ServiceUsageReadonly>(
      `/clients/services/${id}/data-usage/${datetime}`
    );
  }

  /**
   * Automatically geocode Service's address and update GPS coordinates
   */
  async geocodeService(id: number): Promise<ApiResponse<ServiceReadOnly>> {
    return this.httpClient.patch<ServiceReadOnly>(
      `/clients/services/${id}/geocode`
    );
  }

  /**
   * End Service immediately. Current day will not be invoiced.
   * Available only for recurring services
   */
  async endService(id: number): Promise<ApiResponse<ServiceReadOnly>> {
    return this.httpClient.patch<ServiceReadOnly>(
      `/clients/services/${id}/end`
    );
  }

  /**
   * Activate quoted Service. Client lead will be automatically converted to regular client
   * Available only for recurring services
   */
  async activateQuotedService(
    id: number,
    options?: ServiceActivate
  ): Promise<ApiResponse<ServiceReadOnly>> {
    return this.httpClient.patch<ServiceReadOnly, ServiceActivate>(
      `/clients/services/${id}/activate-quoted`,
      options || {}
    );
  }

  /**
   * Enable traffic shaping override on a Service
   */
  async enableTrafficShapingOverride(
    id: number,
    override: ServiceTrafficShapingOverride
  ): Promise<ApiResponse<ServiceReadOnly>> {
    return this.httpClient.patch<
      ServiceReadOnly,
      ServiceTrafficShapingOverride
    >(`/clients/services/${id}/traffic-shaping-override`, override);
  }

  /**
   * Disable traffic shaping override on a Service
   */
  async disableTrafficShapingOverride(
    id: number
  ): Promise<ApiResponse<ServiceReadOnly>> {
    return this.httpClient.delete<ServiceReadOnly>(
      `/clients/services/${id}/traffic-shaping-override`
    );
  }

  /**
   * Pause Service for a given date range
   */
  async pauseService(
    id: number,
    pause: ServicePause
  ): Promise<ApiResponse<void>> {
    return this.httpClient.patch<void, ServicePause>(
      `/clients/services/${id}/pause`,
      pause
    );
  }

  /**
   * Cancel Service deferred change
   */
  async cancelDeferredChange(id: number): Promise<ApiResponse<void>> {
    return this.httpClient.patch<void>(
      `/clients/services/${id}/cancel-deferred-change`
    );
  }

  /**
   * Suspend Service
   */
  async suspendService(id: number): Promise<ApiResponse<ServiceReadOnly>> {
    return this.httpClient.patch<ServiceReadOnly>(
      `/clients/services/${id}/suspend`
    );
  }

  /**
   * Cancel Service suspension
   */
  async cancelSuspendService(
    id: number
  ): Promise<ApiResponse<ServiceReadOnly>> {
    return this.httpClient.patch<ServiceReadOnly>(
      `/clients/services/${id}/cancel-suspend`
    );
  }

  // Service Change Requests
  /**
   * Retrieve collection of Service Change Requests
   */
  async getServiceChangeRequests(params?: {
    limit?: number;
    offset?: number;
  }): Promise<ApiResponse<ServiceChangeRequestReadOnly[]>> {
    const queryString = params ? this.httpClient.buildQueryString(params) : "";
    return this.httpClient.get<ServiceChangeRequestReadOnly[]>(
      `/service-change-requests${queryString}`
    );
  }

  /**
   * Create Service Change Request
   * Available only for recurring services
   */
  async createServiceChangeRequest(
    request: ServiceChangeRequest
  ): Promise<ApiResponse<ServiceChangeRequestReadOnly>> {
    return this.httpClient.post<
      ServiceChangeRequestReadOnly,
      ServiceChangeRequest
    >("/service-change-requests", request);
  }

  /**
   * Retrieve Service Change Request by ID
   */
  async getServiceChangeRequest(
    id: string
  ): Promise<ApiResponse<ServiceChangeRequestReadOnly>> {
    return this.httpClient.get<ServiceChangeRequestReadOnly>(
      `/service-change-requests/${id}`
    );
  }

  /**
   * Delete Service Change Request
   */
  async deleteServiceChangeRequest(id: string): Promise<ApiResponse<void>> {
    return this.httpClient.delete<void>(`/service-change-requests/${id}`);
  }

  /**
   * Accept Service Change Request
   */
  async acceptServiceChangeRequest(id: string): Promise<ApiResponse<void>> {
    return this.httpClient.patch<void>(`/service-change-requests/${id}/accept`);
  }

  // Prepaid Service Periods
  /**
   * Retrieve collection of Prepaid Service Periods
   */
  async getPrepaidServicePeriods(
    params?: PrepaidServicePeriodSearchParams
  ): Promise<ApiResponse<PrepaidServicePeriod[]>> {
    const queryString = params ? this.httpClient.buildQueryString(params) : "";
    return this.httpClient.get<PrepaidServicePeriod[]>(
      `/prepaid-service-periods${queryString}`
    );
  }

  /**
   * Retrieve Prepaid Service Period by ID
   */
  async getPrepaidServicePeriod(
    id: number
  ): Promise<ApiResponse<PrepaidServicePeriod>> {
    return this.httpClient.get<PrepaidServicePeriod>(
      `/prepaid-service-periods/${id}`
    );
  }

  /**
   * Create Prepaid Service Period
   */
  async createPrepaidServicePeriod(
    period: Omit<PrepaidServicePeriod, "id" | "createdDate">
  ): Promise<ApiResponse<PrepaidServicePeriod>> {
    return this.httpClient.post<
      PrepaidServicePeriod,
      Omit<PrepaidServicePeriod, "id" | "createdDate">
    >("/prepaid-service-periods", period);
  }

  /**
   * Update Prepaid Service Period
   */
  async updatePrepaidServicePeriod(
    id: number,
    period: Partial<Omit<PrepaidServicePeriod, "id" | "createdDate">>
  ): Promise<ApiResponse<PrepaidServicePeriod>> {
    return this.httpClient.patch<
      PrepaidServicePeriod,
      Partial<Omit<PrepaidServicePeriod, "id" | "createdDate">>
    >(`/prepaid-service-periods/${id}`, period);
  }

  /**
   * Delete Prepaid Service Period
   */
  async deletePrepaidServicePeriod(id: number): Promise<ApiResponse<void>> {
    return this.httpClient.delete<void>(`/prepaid-service-periods/${id}`);
  }
}
