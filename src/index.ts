// Main exports
export { UispCrmClient } from "./uisp-crm-client";

// Export all types
export * from "./uisp-crm-client";
export * from "./types";
export * from "./errors";

// Export API classes for advanced usage
export { ClientsApi } from "./api/clients-api";
export { InvoicesApi } from "./api/invoices-api";
export { CreditNotesApi } from "./api/credit-notes-api";
export { OrganizationsApi, PaymentMethodsApi, PaymentPlansApi, FeesApi } from "./api/organizations-api";
export { DocumentsApi, DocumentTemplatesApi, CustomAttributesApi, GeocodingApi } from "./api/documents-api";
export { JobsApi, JobCommentsApi, JobTasksApi, JobAttachmentsApi } from "./api/jobs-api";

// Export HTTP client for advanced usage
export { HttpClient } from "./http/http-client";

// Default export
import { UispCrmClient } from "./uisp-crm-client";
export default UispCrmClient;
