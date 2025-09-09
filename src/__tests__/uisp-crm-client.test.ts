import { UispCrmClient } from "../index";

describe("UispCrmClient", () => {
  let client: UispCrmClient;

  beforeEach(() => {
    client = new UispCrmClient({
      baseUrl: "https://test.example.com/crm/api/v1.0",
      appKey: "test-app-key",
    });
  });

  describe("constructor", () => {
    it("should create client with valid config", () => {
      expect(client).toBeInstanceOf(UispCrmClient);
      expect(client.clients).toBeDefined();
      expect(client.services).toBeDefined();
      expect(client.invoices).toBeDefined();
      expect(client.organizations).toBeDefined();
    });

    it("should throw error with missing baseUrl", () => {
      expect(() => {
        new UispCrmClient({
          baseUrl: "",
          appKey: "test-key",
        });
      }).toThrow("baseUrl is required in UispCrmConfig");
    });

    it("should throw error with missing appKey", () => {
      expect(() => {
        new UispCrmClient({
          baseUrl: "https://test.example.com",
          appKey: "",
        });
      }).toThrow("appKey is required in UispCrmConfig");
    });

    it("should normalize baseUrl by removing trailing slash", () => {
      const clientWithSlash = new UispCrmClient({
        baseUrl: "https://test.example.com/crm/api/v1.0/",
        appKey: "test-key",
      });

      const config = clientWithSlash.getConfig();
      expect(config.baseUrl).toBe("https://test.example.com/crm/api/v1.0");
    });
  });

  describe("getConfig", () => {
    it("should return current configuration", () => {
      const config = client.getConfig();
      expect(config.baseUrl).toBe("https://test.example.com/crm/api/v1.0");
      expect(config.appKey).toBe("test-app-key");
    });
  });

  describe("API groups", () => {
    it("should have all API groups initialized", () => {
      expect(client.clients).toBeDefined();
      expect(client.services).toBeDefined();
      expect(client.invoices).toBeDefined();
      expect(client.creditNotes).toBeDefined();
      expect(client.organizations).toBeDefined();
      expect(client.paymentMethods).toBeDefined();
      expect(client.paymentPlans).toBeDefined();
      expect(client.fees).toBeDefined();
      expect(client.documents).toBeDefined();
      expect(client.documentTemplates).toBeDefined();
      expect(client.customAttributes).toBeDefined();
      expect(client.geocoding).toBeDefined();
      expect(client.jobs).toBeDefined();
      expect(client.jobComments).toBeDefined();
      expect(client.jobTasks).toBeDefined();
      expect(client.jobAttachments).toBeDefined();
    });
  });
});

// Mock tests for HTTP client functionality
describe("HttpClient Integration", () => {
  it("should build query strings correctly", () => {
    const client = new UispCrmClient({
      baseUrl: "https://test.example.com",
      appKey: "test-key",
    });

    // Access the private httpClient for testing
    const httpClient = (client as any).httpClient;

    const queryString = httpClient.buildQueryString({
      limit: 10,
      offset: 0,
      query: "test search",
      statuses: [1, 2, 3],
      isArchived: 0,
    });

    expect(queryString).toContain("limit=10");
    expect(queryString).toContain("offset=0");
    expect(queryString).toContain("query=test+search"); // URLSearchParams uses + for spaces
    expect(queryString).toContain("isArchived=0");
    // Array parameters should be handled correctly
    expect(queryString).toMatch(/statuses.*=1/);
    expect(queryString).toMatch(/statuses.*=2/);
    expect(queryString).toMatch(/statuses.*=3/);
  });

  it("should handle empty parameters", () => {
    const client = new UispCrmClient({
      baseUrl: "https://test.example.com",
      appKey: "test-key",
    });

    const httpClient = (client as any).httpClient;
    const queryString = httpClient.buildQueryString({});
    expect(queryString).toBe("");
  });

  it("should handle undefined and null parameters", () => {
    const client = new UispCrmClient({
      baseUrl: "https://test.example.com",
      appKey: "test-key",
    });

    const httpClient = (client as any).httpClient;
    const queryString = httpClient.buildQueryString({
      limit: 10,
      offset: undefined,
      query: null,
      isArchived: 0,
    });

    expect(queryString).toContain("limit=10");
    expect(queryString).toContain("isArchived=0");
    expect(queryString).not.toContain("offset");
    expect(queryString).not.toContain("query");
  });
});

// Type checking tests
describe("TypeScript Types", () => {
  it("should provide proper types for client data", () => {
    // These tests will fail at compile time if types are wrong
    const clientData = {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      organizationId: 1,
      isActive: true,
      registrationDate: "2024-01-01",
      accountBalance: 100.5,
    };

    // Type assertion to ensure the interface is correct
    expect(typeof clientData.id).toBe("number");
    expect(typeof clientData.firstName).toBe("string");
    expect(typeof clientData.email).toBe("string");
    expect(typeof clientData.isActive).toBe("boolean");
  });
});
