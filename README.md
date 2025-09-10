# UISP CRM API TypeScript Client

[![npm version](https://badge.fury.io/js/uisp-crm-api.svg)](https://badge.fury.io/js/uisp-crm-api)
[![GitHub](https://img.shields.io/github/license/diegomax/uisp)](https://github.com/diegomax/uisp/blob/main/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org)

A comprehensive TypeScript client library for the UISP (Ubiquiti ISP Platform) CRM API. This library provides type-safe access to all UISP CRM endpoints with full TypeScript support.

## 🎉 What's New in v1.1.0

**Enhanced Security & Error Handling** - We've completely overhauled error handling to be production-ready:

- **🔐 Security-first**: No more stack traces or sensitive data exposure in production
- **🎯 Custom Error Types**: Specific error classes for different scenarios (network, auth, validation, etc.)
- **🆔 Error Tracking**: Unique error IDs for better debugging and monitoring
- **📊 Structured Logging**: Clean, consistent error messages perfect for logging systems
- **🛡️ Safe by Default**: Automatic detection of development vs production environments

**Breaking Change**: Error handling now uses custom error types instead of generic `Error` objects. See [Error Handling](#error-handling) for migration details.

## Features

- 🔒 **Type-safe** - Full TypeScript support with comprehensive type definitions
- 🚀 **Complete API coverage** - All UISP CRM endpoints supported including Services API
- 🛡️ **Enhanced Error handling** - Production-safe error handling with custom error types and secure logging
- 📁 **Organized structure** - Clean, modular API organized by functionality
- 🔧 **Easy configuration** - Simple setup with sensible defaults
- 📖 **Well documented** - Comprehensive documentation and examples
- 🔄 **Services Management** - Full support for service lifecycle management, traffic shaping, and usage tracking
- 🔐 **Security-focused** - Stack traces and sensitive information hidden in production
- 🆔 **Error tracking** - Unique error IDs for debugging and monitoring

## Installation

```bash
npm install uisp-crm-api
```

## Quick Start

```typescript
import { UispCrmClient } from "uisp-crm-api";

// Initialize the client
const client = new UispCrmClient({
  baseUrl: "https://your-uisp-instance.com/crm/api/v1.0",
  appKey: "your-app-key-here",
});

// Test the connection
const isConnected = await client.testConnection();

// Get all clients
const clients = await client.clients.getClients();

// Create a new client
const newClient = await client.clients.createClient({
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
});

// Get all services
const services = await client.services.getServices();

// Create a service for the client
const newService = await client.services.createService(newClient.data.id, {
  name: "Internet Service",
  price: 29.99,
});
```

## Configuration

### Basic Configuration

```typescript
const client = new UispCrmClient({
  baseUrl: "https://your-uisp-instance.com/crm/api/v1.0",
  appKey: "your-app-key-here",
});
```

### Advanced Configuration

```typescript
const client = new UispCrmClient({
  baseUrl: "https://your-uisp-instance.com/crm/api/v1.0",
  appKey: "your-app-key-here",
  timeout: 30000, // Request timeout in milliseconds (default: 30000)
  retries: 3, // Number of retries on failure (default: 0)
});
```

### Environment Variables

You can also use environment variables:

```typescript
const client = new UispCrmClient({
  baseUrl: process.env.UISP_BASE_URL!,
  appKey: process.env.UISP_APP_KEY!,
});
```

## Authentication

This library uses UISP CRM App Keys for authentication. To generate an app key:

1. Go to your UISP CRM instance
2. Navigate to **Settings** → **Security** → **App keys**
3. Generate a new app key with appropriate permissions:
   - **Read** permissions for GET requests
   - **Write** permissions for POST, PUT, PATCH, DELETE requests

## API Reference

The client is organized into logical groups of related functionality:

### Clients

```typescript
// Get all clients
const clients = await client.clients.getClients({
  limit: 10,
  offset: 0,
  query: "john",
  isArchived: 0,
});

// Get specific client
const client = await client.clients.getClient(123);

// Create new client
const newClient = await client.clients.createClient({
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  organizationId: 1,
});

// Update client
const updatedClient = await client.clients.updateClient(123, {
  note: "Updated via API",
});

// Archive/restore client
await client.clients.archiveClient(123);
await client.clients.restoreClient(123);

// Manage client tags
await client.clients.addClientTag(123, 456);
await client.clients.removeClientTag(123, 456);

// Send invitation
await client.clients.sendInvitation(123);

// Geocode address
await client.clients.geocodeClient(123);
```

### Services

```typescript
// Get all services
const services = await client.services.getServices({
  clientId: 123,
  organizationId: 1,
  statuses: [1], // Active services only
  limit: 10,
});

// Get specific service
const service = await client.services.getService(456);

// Create new service for a client
const newService = await client.services.createService(123, {
  name: "Premium Internet Service",
  price: 49.99,
  servicePlanId: 1,
  activeFrom: "2024-01-01",
  invoicingPeriodType: 1, // MONTH
  invoicingPeriod: 1,
  street1: "123 Service Address",
  city: "Service City",
  zipCode: "12345",
});

// Update service
const updatedService = await client.services.updateService(456, {
  price: 59.99,
  note: "Price updated",
});

// Service management operations
await client.services.geocodeService(456); // Auto-geocode service address
await client.services.activateQuotedService(456, {
  activateDate: "2024-01-01",
  setupFeeInvoiceImmediately: true,
});
await client.services.suspendService(456); // Suspend service
await client.services.cancelSuspendService(456); // Resume service
await client.services.endService(456); // End service permanently

// Pause service for a period
await client.services.pauseService(456, {
  pauseFrom: "2024-06-01",
  pauseTo: "2024-06-30",
});

// Cancel deferred changes
await client.services.cancelDeferredChange(456);

// Traffic shaping controls
await client.services.enableTrafficShapingOverride(456, {
  downloadSpeedOverride: 100, // Mbps
  uploadSpeedOverride: 50, // Mbps
});
await client.services.disableTrafficShapingOverride(456);

// Get service usage data
const usageData = await client.services.getServiceDataUsage(456, "2024-01-01T00:00:00+0000");
console.log(`Download: ${usageData.data.download} ${usageData.data.downloadUnit}`);

// Service change requests
const changeRequests = await client.services.getServiceChangeRequests();

const newChangeRequest = await client.services.createServiceChangeRequest({
  serviceId: 456,
  servicePlanId: 2,
  note: "Customer requested upgrade",
});

await client.services.acceptServiceChangeRequest(newChangeRequest.data.id);

// Prepaid service periods (for prepaid services)
const periods = await client.services.getPrepaidServicePeriods({
  serviceId: 456,
  limit: 10,
});

const newPeriod = await client.services.createPrepaidServicePeriod({
  serviceId: 456,
  startDate: "2024-01-01",
  endDate: "2024-01-31",
  price: 49.99,
});
```

### Client Bank Accounts

```typescript
// Get client bank accounts
const bankAccounts = await client.clients.getClientBankAccounts(123);

// Create bank account
const newAccount = await client.clients.createClientBankAccount(123, {
  name: "Primary Account",
  field1: "Account Number",
  field2: "Routing Number",
});

// Update bank account
await client.clients.updateClientBankAccount(456, {
  name: "Updated Account Name",
});

// Delete bank account
await client.clients.deleteClientBankAccount(456);
```

### Client Contacts

```typescript
// Get client contacts
const contacts = await client.clients.getClientContacts(123);

// Create contact
const newContact = await client.clients.createClientContact(123, {
  name: "Jane Doe",
  email: "jane@example.com",
  phone: "+1234567890",
  isBilling: true,
});

// Update contact
await client.clients.updateClientContact(456, {
  name: "Updated Name",
});

// Delete contact
await client.clients.deleteClientContact(456);
```

### Invoices

```typescript
// Get invoices
const invoices = await client.invoices.getInvoices({
  clientId: 123,
  statuses: [1, 2], // Draft, Unpaid
  createdDateFrom: "2024-01-01",
  createdDateTo: "2024-12-31",
});

// Create invoice
const newInvoice = await client.invoices.createInvoiceForClient(123, {
  organizationId: 1,
  maturityDays: 30,
  notes: "Monthly service fee",
  invoiceItems: [
    {
      type: "service",
      label: "Internet Service",
      price: 50.0,
      quantity: 1,
      unit: "month",
      taxRate1: 10,
    },
  ],
});

// Invoice operations
await client.invoices.approveInvoice(456);
await client.invoices.sendInvoice(456);
await client.invoices.voidInvoice(456);

// Download PDF
const pdfBuffer = await client.invoices.getInvoicePdf(456);
```

### Credit Notes

```typescript
// Get credit notes
const creditNotes = await client.creditNotes.getCreditNotes({
  clientId: 123,
  createdDateFrom: "2024-01-01",
});

// Create credit note
const newCreditNote = await client.creditNotes.createCreditNoteForClient(123, {
  organizationId: 1,
  number: "CN-001",
  notes: "Service credit",
  creditNoteItems: [
    {
      type: "credit",
      label: "Service Credit",
      price: -25.0,
      quantity: 1,
    },
  ],
});

// Send credit note
await client.creditNotes.sendCreditNote(456);

// Download PDF
const pdfBuffer = await client.creditNotes.getCreditNotePdf(456);
```

### Organizations

```typescript
// Get organizations
const organizations = await client.organizations.getOrganizations();

// Create organization
const newOrg = await client.organizations.createOrganization({
  name: "My ISP Company",
  email: "billing@myisp.com",
  street1: "123 Main St",
  city: "Anytown",
  zipCode: "12345",
});

// Get next invoice numbers
const nextInvoice = await client.organizations.getNextInvoiceNumber(1);
const nextProforma = await client.organizations.getNextProformaInvoiceNumber(1);
const nextQuote = await client.organizations.getNextQuoteNumber(1);

// Send email
await client.organizations.enqueueEmail(1, {
  subject: "Test Email",
  body: "Hello World",
  to: ["customer@example.com"],
});
```

### Jobs (Scheduling)

```typescript
// Get jobs
const jobs = await client.jobs.getJobs({
  clientId: 123,
  assignedUserId: 456,
  dateFrom: "2024-01-01",
  dateTo: "2024-12-31",
});

// Create job
const newJob = await client.jobs.createJob({
  title: "Installation Service",
  description: "Install new service",
  clientId: 123,
  assignedUserId: 456,
  date: "2024-12-01T10:00:00Z",
  duration: 120,
  status: 1,
});

// Add job comment
await client.jobComments.createJobComment({
  jobId: 789,
  message: "Job completed successfully",
});

// Add job task
await client.jobTasks.createJobTask({
  jobId: 789,
  label: "Verify equipment",
  closed: false,
});
```

### Documents & Files

```typescript
// Get documents
const documents = await client.documents.getDocuments({
  clientId: 123,
  types: ["document", "image"],
});

// Upload document
const newDoc = await client.documents.createDocument({
  clientId: 123,
  name: "contract.pdf",
  file: base64FileContent,
  mimeType: "application/pdf",
});

// Download file
const fileBuffer = await client.documents.getDocumentFile(456);
```

### Custom Attributes

```typescript
// Get custom attributes
const attributes = await client.customAttributes.getCustomAttributes({
  attributeType: "client",
});

// Create custom attribute
const newAttribute = await client.customAttributes.createCustomAttribute({
  name: "Customer Tier",
  attributeType: "client",
  key: "customer_tier",
});
```

### Geocoding

```typescript
// Geocode address
const location = await client.geocoding.geocode({
  address: "123 Main St, Anytown, USA",
});

// Get address suggestions
const suggestions = await client.geocoding.suggestAddresses({
  query: "123 Main",
  lat: "40.7128",
  lon: "-74.0060",
});
```

## Error Handling

The library provides comprehensive, production-safe error handling with custom error types:

```typescript
import {
  UispNetworkError,
  UispAuthenticationError,
  UispPermissionError,
  UispNotFoundError,
  UispValidationError,
} from "uisp-crm-api";

try {
  const client = await client.clients.getClient(123);
} catch (error) {
  if (error instanceof UispAuthenticationError) {
    console.error("Authentication failed - check your app key");
  } else if (error instanceof UispPermissionError) {
    console.error("Insufficient permissions for this operation");
  } else if (error instanceof UispNotFoundError) {
    console.error("Resource not found:", error.message);
  } else if (error instanceof UispValidationError) {
    console.error("Invalid input data:", error.message);
  } else if (error instanceof UispNetworkError) {
    console.error("Network connection failed");
  } else {
    console.error("Unexpected error:", error.message);
  }
}
```

### Error Types

The library includes specific error types for different scenarios:

- **`UispNetworkError`** - Connection issues, server unreachable
- **`UispAuthenticationError`** - Invalid or missing app key (401)
- **`UispPermissionError`** - Insufficient permissions (403)
- **`UispNotFoundError`** - Resource not found (404)
- **`UispValidationError`** - Request validation failures (422)
- **`UispRateLimitError`** - Rate limiting exceeded (429)
- **`UispServerError`** - Internal server errors (500)
- **`UispServiceUnavailableError`** - Service temporarily unavailable (503)

### Security Features

- **🔒 Stack trace protection**: Stack traces are hidden in production environments
- **🎭 Sensitive data masking**: API keys, file paths, and internal details are never exposed
- **🆔 Error tracking**: Each error includes a unique tracking ID for debugging
- **📊 Structured logging**: Clean, consistent error messages suitable for monitoring systems

## TypeScript Support

This library is written in TypeScript and provides full type definitions:

```typescript
import { ClientReadOnly, ClientWritable, InvoiceReadOnly } from "uisp-crm-api";

// All API responses are properly typed
const clients: ClientReadOnly[] = (await client.clients.getClients()).data;

// Input parameters are validated at compile time
const newClient: ClientWritable = {
  firstName: "John", // ✅ Valid
  lastName: "Doe", // ✅ Valid
  invalidField: "value", // ❌ TypeScript error
};
```

## Examples

See the [`examples/`](./examples/) directory for more comprehensive examples:

- [Basic Usage](./examples/usage-examples.ts)
- [Services API Examples](./examples/services-examples.ts) - Complete Services API usage examples
- Advanced scenarios
- Error handling patterns
- Real-world use cases

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Development

```bash
# Install dependencies
npm install

# Build the library
npm run build

# Run tests
npm test

# Lint code
npm run lint

# Watch mode for development
npm run build:watch
```

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Support

- [UISP CRM Documentation](https://help.ui.com/hc/en-us/categories/360002470134-UISP)
- [GitHub Issues](https://github.com/diegomax/uisp/issues)
- [API Blueprint](https://github.com/diegomax/uisp/blob/main/unmscrm.apib) - Original API specification

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
