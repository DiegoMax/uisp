# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2025-09-10

### Added

- **Enhanced Error Handling System**: Complete overhaul of error handling with production-safe logging
- **Custom Error Types**: Introduced specific error classes for different failure scenarios:
  - `UispNetworkError` - Connection and network-related issues
  - `UispAuthenticationError` - Invalid or missing app key
  - `UispPermissionError` - Insufficient permissions
  - `UispNotFoundError` - Resource not found
  - `UispValidationError` - Request validation failures
  - `UispRateLimitError` - Rate limiting issues
  - `UispServerError` - Server-side errors
  - `UispServiceUnavailableError` - Service temporarily unavailable
- **Secure Error Logging**: Stack traces and sensitive information are now hidden in production
- **Error Context**: Structured error logging with component identification and operation context
- **Unique Error IDs**: Each error gets a unique tracking ID for debugging

### Changed

- **Breaking Change**: Error handling now throws custom error types instead of generic `Error` objects
- **Improved Security**: Removed exposure of internal file paths, stack traces, and configuration details
- **Better User Experience**: Clean, user-friendly error messages instead of raw technical details

### Security

- **Stack Trace Protection**: Stack traces are no longer exposed in production environments
- **Sensitive Data Masking**: Removed potential exposure of API keys, file paths, and internal configurations
- **Safe Error Serialization**: Errors are properly sanitized before being logged or returned

### Technical Details

- Replaced raw `console.error()` calls with structured logging
- Implemented centralized error handling in HTTP client interceptors
- Added development vs production environment detection for appropriate error verbosity
- Enhanced type safety with proper error class hierarchy

### Migration Guide (v1.0.x → v1.1.0)

#### Error Handling Changes

**Before (v1.0.x):**

```typescript
try {
  const client = await uispClient.clients.getClient(123);
} catch (error) {
  if (error instanceof Error) {
    console.error("Error:", error.message);
  }
}
```

**After (v1.1.0):**

```typescript
import { UispAuthenticationError, UispNotFoundError } from "uisp-crm-api";

try {
  const client = await uispClient.clients.getClient(123);
} catch (error) {
  if (error instanceof UispAuthenticationError) {
    console.error("Auth failed:", error.message);
  } else if (error instanceof UispNotFoundError) {
    console.error("Not found:", error.message);
  }
  // All error types still extend Error, so this still works:
  // console.error("Error:", error.message);
}
```

#### Key Changes

1. **Custom Error Types**: Import and use specific error types for better error handling
2. **Secure Logging**: Stack traces are automatically hidden in production (`NODE_ENV !== 'development'`)
3. **Error IDs**: Each error now has a unique `errorId` property for tracking
4. **Backward Compatibility**: All new error types extend `Error`, so existing code continues to work

## [1.0.4] - Previous Release

### Fixed

- 🐛 **Bug Fix: Service Attributes** - Fixed service attributes property name from `customAttributes` to `attributes` to match actual API response

### Changed

- 🔧 **Enhanced Service Types** - Updated ServiceReadOnly interface to include all missing properties from actual API response:
  - Added `prepaid`, `fullAddress`, `hasIndividualPrice`, `totalPrice`, `currencyCode`, `invoiceLabel`
  - Added `servicePlanType`, `servicePlanPeriodId`, `servicePlanGroupId`, `contractLengthType`
  - Added `setupFeePrice`, `lastInvoicedDate`, `unmsClientSiteId`, `unmsClientSiteStatus`
  - Added `addressData`, `suspensionReasonId`, `serviceChangeRequestId`, `trafficShapingOverrideEnd`, `trafficShapingOverrideEnabled`
  - Added support for `suspensionPeriods` and `surcharges` arrays
- 📝 **Updated Type Definitions** - Enhanced ServiceCustomAttribute interface to match API response structure

### Added

- ✨ **New Interfaces** - Added ServiceSuspensionPeriod and ServiceSurcharge interfaces
- 🧪 **Testing** - Added service attributes test example to verify proper typing

## [1.0.3] - Previous Release

### Added

- 🎉 **New Feature: Services API** - Complete implementation of Services API endpoints
  - Full CRUD operations for services (`getServices`, `getService`, `createService`, `updateService`, `deleteService`)
  - Service management operations (`geocodeService`, `endService`, `activateQuotedService`, `pauseService`, `suspendService`)
  - Traffic shaping controls (`enableTrafficShapingOverride`, `disableTrafficShapingOverride`)
  - Usage data retrieval (`getServiceDataUsage`)
  - Service change requests support (create, approve, delete change requests)
  - Prepaid service periods management
- 📚 **Documentation** - Added comprehensive Services API examples and usage documentation
- 🧪 **Testing** - Added complete test coverage for Services API
- 🔧 **Types** - Added complete TypeScript type definitions for all service-related objects and enums
- ✨ **Client Integration** - Services API now accessible via `client.services.*` methods

## [1.0.0] - Initial Release

### Added

- Initial release
- Complete API coverage for UISP CRM v1.0
- TypeScript support with full type definitions
- Request/response interceptors
- Query parameter building utilities
- Full documentation and examples
