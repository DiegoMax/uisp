import { UispCrmClient } from "../uisp-crm-client";
import { ServicesApi } from "../api/services-api";

describe("ServicesApi", () => {
  let client: UispCrmClient;
  let servicesApi: ServicesApi;

  beforeEach(() => {
    client = new UispCrmClient({
      baseUrl: "https://test.example.com/crm/api/v1.0",
      appKey: "test-app-key",
    });
    servicesApi = client.services;
  });

  describe("constructor", () => {
    it("should be properly initialized", () => {
      expect(servicesApi).toBeDefined();
      expect(servicesApi).toBeInstanceOf(ServicesApi);
    });
  });

  describe("API methods", () => {
    it("should have all required methods", () => {
      // Service CRUD operations
      expect(typeof servicesApi.getServices).toBe("function");
      expect(typeof servicesApi.getService).toBe("function");
      expect(typeof servicesApi.createService).toBe("function");
      expect(typeof servicesApi.updateService).toBe("function");
      expect(typeof servicesApi.deleteService).toBe("function");

      // Service management operations
      expect(typeof servicesApi.geocodeService).toBe("function");
      expect(typeof servicesApi.endService).toBe("function");
      expect(typeof servicesApi.activateQuotedService).toBe("function");
      expect(typeof servicesApi.pauseService).toBe("function");
      expect(typeof servicesApi.cancelDeferredChange).toBe("function");
      expect(typeof servicesApi.suspendService).toBe("function");
      expect(typeof servicesApi.cancelSuspendService).toBe("function");

      // Traffic shaping
      expect(typeof servicesApi.enableTrafficShapingOverride).toBe("function");
      expect(typeof servicesApi.disableTrafficShapingOverride).toBe("function");

      // Data usage
      expect(typeof servicesApi.getServiceDataUsage).toBe("function");

      // Service change requests
      expect(typeof servicesApi.getServiceChangeRequests).toBe("function");
      expect(typeof servicesApi.createServiceChangeRequest).toBe("function");
      expect(typeof servicesApi.getServiceChangeRequest).toBe("function");
      expect(typeof servicesApi.deleteServiceChangeRequest).toBe("function");
      expect(typeof servicesApi.acceptServiceChangeRequest).toBe("function");

      // Prepaid service periods
      expect(typeof servicesApi.getPrepaidServicePeriods).toBe("function");
      expect(typeof servicesApi.getPrepaidServicePeriod).toBe("function");
      expect(typeof servicesApi.createPrepaidServicePeriod).toBe("function");
      expect(typeof servicesApi.updatePrepaidServicePeriod).toBe("function");
      expect(typeof servicesApi.deletePrepaidServicePeriod).toBe("function");
    });
  });

  describe("integration with main client", () => {
    it("should be accessible through main client", () => {
      expect(client.services).toBeDefined();
      expect(client.services).toBe(servicesApi);
    });
  });
});
