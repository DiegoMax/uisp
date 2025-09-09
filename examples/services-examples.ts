import { UispCrmClient } from "../src/index";

/**
 * Example usage of the Services API
 *
 * This demonstrates how to use the UISP CRM Services API wrapper
 */
async function servicesApiExamples() {
  // Initialize the client
  const client = new UispCrmClient({
    baseUrl: "https://your-uisp-instance.com/crm/api/v1.0",
    appKey: "your-app-key-here",
  });

  try {
    // Get all services
    console.log("Fetching all services...");
    const allServices = await client.services.getServices();
    console.log(`Found ${allServices.data.length} services`);

    // Get services for a specific client
    console.log("Fetching services for client ID 1...");
    const clientServices = await client.services.getServices({
      clientId: 1,
      limit: 10,
    });
    console.log(`Client has ${clientServices.data.length} services`);

    // Create a new service for a client
    console.log("Creating a new service...");
    const newService = await client.services.createService(1, {
      name: "Premium Internet Service",
      price: 49.99,
      servicePlanId: 1,
      activeFrom: "2024-01-01",
      invoicingPeriodType: 1, // MONTH
      invoicingPeriod: 1, // Every 1 month
      taxable: true,
      street1: "123 Main St",
      city: "New York",
      zipCode: "10001",
      note: "Premium service with high speed internet",
    });
    console.log(`Created service with ID: ${newService.data.id}`);

    // Get a specific service
    const serviceId = newService.data.id;
    const service = await client.services.getService(serviceId);
    console.log(`Service ${service.data.name} costs $${service.data.price}`);

    // Update a service
    console.log("Updating service price...");
    const updatedService = await client.services.updateService(serviceId, {
      price: 59.99,
      note: "Price updated due to market conditions",
    });
    console.log(`Service price updated to $${updatedService.data.price}`);

    // Get service usage data
    console.log("Getting service usage data...");
    try {
      const usageData = await client.services.getServiceDataUsage(
        serviceId,
        "2024-01-01T00:00:00+0000"
      );
      console.log(
        `Download: ${usageData.data.download} ${usageData.data.downloadUnit}`
      );
      console.log(
        `Upload: ${usageData.data.upload} ${usageData.data.uploadUnit}`
      );
    } catch (error) {
      console.log("Usage data not available (service might not be active)");
    }

    // Geocode service address
    console.log("Geocoding service address...");
    const geocodedService = await client.services.geocodeService(serviceId);
    console.log(
      `Geocoded coordinates: ${geocodedService.data.addressGpsLat}, ${geocodedService.data.addressGpsLon}`
    );

    // Activate a quoted service
    if (service.data.status === 7) {
      // QUOTED
      console.log("Activating quoted service...");
      const activatedService = await client.services.activateQuotedService(
        serviceId,
        {
          activateDate: "2024-01-01",
          setupFeeInvoiceImmediately: true,
        }
      );
      console.log(
        `Service activated with status: ${activatedService.data.status}`
      );
    }

    // Set traffic shaping override
    console.log("Setting traffic shaping override...");
    const shapedService = await client.services.enableTrafficShapingOverride(
      serviceId,
      {
        downloadSpeedOverride: 100, // Mbps
        uploadSpeedOverride: 50, // Mbps
      }
    );
    console.log(
      `Traffic shaping set - Download: ${shapedService.data.downloadSpeedOverride}Mbps`
    );

    // Pause service for a period
    console.log("Pausing service...");
    await client.services.pauseService(serviceId, {
      pauseFrom: "2024-06-01",
      pauseTo: "2024-06-30",
    });
    console.log("Service paused for June 2024");

    // Cancel the pause (deferred change)
    console.log("Cancelling service pause...");
    await client.services.cancelDeferredChange(serviceId);
    console.log("Service pause cancelled");

    // Service Change Requests
    console.log("Creating service change request...");
    const changeRequest = await client.services.createServiceChangeRequest({
      serviceId: serviceId,
      servicePlanId: 2, // Change to different plan
      note: "Customer requested upgrade to premium plan",
    });
    console.log(`Created change request with ID: ${changeRequest.data.id}`);

    // Get all service change requests
    const changeRequests = await client.services.getServiceChangeRequests();
    console.log(`Found ${changeRequests.data.length} change requests`);

    // Accept the change request
    console.log("Accepting change request...");
    await client.services.acceptServiceChangeRequest(changeRequest.data.id);
    console.log("Change request accepted");

    // Prepaid Service Periods (if applicable)
    console.log("Getting prepaid service periods...");
    const periods = await client.services.getPrepaidServicePeriods({
      serviceId: serviceId,
      limit: 5,
    });
    console.log(`Found ${periods.data.length} prepaid periods`);

    // End service (for recurring services)
    // console.log("Ending service...");
    // await client.services.endService(serviceId);
    // console.log("Service ended");
  } catch (error) {
    console.error("Error in services API example:", error);
  }
}

// Export the example function
export { servicesApiExamples };

// Uncomment to run the examples
// if (require.main === module) {
//   servicesApiExamples();
// }
