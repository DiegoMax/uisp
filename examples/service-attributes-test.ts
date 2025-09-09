import { UispCrmClient, ServiceReadOnly } from "../src/index";

/**
 * Test to verify that service attributes are properly typed and accessible
 */
async function testServiceAttributes() {
  // This is just a type check - no actual API call
  const mockService: ServiceReadOnly = {
    id: 4161,
    prepaid: false,
    clientId: 4423,
    status: 1,
    name: "Conectividad 10M",
    price: 10699,
    attributes: [
      {
        id: "3420b980-206d-4522-b7b3-ac112dc1a534",
        serviceId: 4161,
        customAttributeId: 9,
        name: "radius_username",
        key: "radiusUsername",
        value: "f.serrano",
        clientZoneVisible: false,
      },
      {
        id: "481225e6-6e81-440f-9bb6-3bd287a48cf5",
        serviceId: 4161,
        customAttributeId: 10,
        name: "radius_password",
        key: "radiusPassword",
        value: "123456",
        clientZoneVisible: false,
      },
    ],
    suspensionPeriods: [
      {
        id: 813,
        startDate: "2021-01-26T00:00:00-0300",
        endDate: "2021-01-26T00:00:00-0300",
      },
    ],
    surcharges: [
      {
        id: 151,
        serviceId: 4161,
        surchargeId: 1,
        invoiceLabel: "Seguro de Equipamiento Wi-Fi",
        price: null,
        taxable: false,
      },
    ],
  };

  // Test type access - these should all work with proper TypeScript types
  console.log("Service ID:", mockService.id);
  console.log("Service Name:", mockService.name);
  console.log("Service Status:", mockService.status);
  console.log("Attributes count:", mockService.attributes?.length || 0);

  if (mockService.attributes) {
    mockService.attributes.forEach((attr, index) => {
      console.log(
        `Attribute ${index + 1}: ${attr.name} (${attr.key}) = ${attr.value}`
      );
    });
  }

  if (mockService.suspensionPeriods) {
    console.log("Suspension periods:", mockService.suspensionPeriods.length);
  }

  if (mockService.surcharges) {
    console.log("Surcharges:", mockService.surcharges.length);
  }

  console.log("✅ Service attributes are now properly typed and accessible!");
}

// Export the test function
export { testServiceAttributes };

// Uncomment to run the test
// if (require.main === module) {
//   testServiceAttributes();
// }
