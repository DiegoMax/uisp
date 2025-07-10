#!/usr/bin/env node

/**
 * Quick Start Example for UISP CRM API TypeScript Client
 *
 * This script demonstrates the basic usage of the library.
 * Make sure to set your environment variables before running:
 *
 * export UISP_BASE_URL="https://your-uisp-instance.com/crm/api/v1.0"
 * export UISP_APP_KEY="your-app-key-here"
 *
 * Then run: npx ts-node examples/quick-start.ts
 */

import { UispCrmClient, ClientReadOnly } from "../src";

async function main() {
  // Check for required environment variables
  if (!process.env.UISP_BASE_URL || !process.env.UISP_APP_KEY) {
    console.error(
      "❌ Please set UISP_BASE_URL and UISP_APP_KEY environment variables"
    );
    console.log("Example:");
    console.log(
      'export UISP_BASE_URL="https://your-uisp-instance.com/crm/api/v1.0"'
    );
    console.log('export UISP_APP_KEY="your-app-key-here"');
    process.exit(1);
  }

  // Initialize the client
  console.log("🔗 Initializing UISP CRM API client...");
  const client = new UispCrmClient({
    baseUrl: process.env.UISP_BASE_URL,
    appKey: process.env.UISP_APP_KEY,
  });

  try {
    // Test connection
    console.log("🔄 Testing connection...");
    const isConnected = await client.testConnection();

    if (!isConnected) {
      console.error("❌ Connection test failed");
      return;
    }

    console.log("✅ Connection successful!");

    // Get organizations
    console.log("\n📋 Fetching organizations...");
    const organizations = await client.organizations.getOrganizations();
    console.log(`Found ${organizations.data.length} organization(s)`);

    if (organizations.data.length > 0) {
      const org = organizations.data[0];
      console.log(`  - ${org.name} (ID: ${org.id})`);
    }

    // Get first 5 clients
    console.log("\n👥 Fetching clients...");
    const clients = await client.clients.getClients({ limit: 5 });
    console.log(`Found ${clients.data.length} client(s) (showing first 5):`);

    clients.data.forEach((client: ClientReadOnly) => {
      console.log(
        `  - ${client.firstName} ${client.lastName} (${client.email})`
      );
    });

    // Get invoice templates
    console.log("\n📄 Fetching invoice templates...");
    const templates = await client.invoices.getInvoiceTemplates({ limit: 3 });
    console.log(`Found ${templates.data.length} invoice template(s):`);

    templates.data.forEach((template) => {
      console.log(`  - ${template.name} (ID: ${template.id})`);
    });

    // Get payment methods
    console.log("\n💳 Fetching payment methods...");
    const paymentMethods = await client.paymentMethods.getPaymentMethods();
    console.log(`Found ${paymentMethods.data.length} payment method(s):`);

    paymentMethods.data.forEach((method) => {
      console.log(
        `  - ${method.name} (${method.method}) - ${
          method.enabled ? "Enabled" : "Disabled"
        }`
      );
    });

    console.log("\n🎉 Quick start completed successfully!");
    console.log("\nNext steps:");
    console.log("1. Check out the examples/ directory for more advanced usage");
    console.log("2. Read the README.md for complete API documentation");
    console.log("3. Start building your integration!");
  } catch (error) {
    console.error("❌ Error during execution:");
    if (error instanceof Error) {
      console.error(`   ${error.message}`);
    } else {
      console.error("   Unknown error occurred");
    }

    console.log("\n🔧 Troubleshooting:");
    console.log("1. Verify your UISP instance URL is correct");
    console.log("2. Check that your app key has the required permissions");
    console.log("3. Ensure your UISP instance is accessible");
  }
}

// Handle uncaught errors gracefully
process.on("unhandledRejection", (error) => {
  console.error("❌ Unhandled promise rejection:", error);
  process.exit(1);
});

process.on("uncaughtException", (error) => {
  console.error("❌ Uncaught exception:", error);
  process.exit(1);
});

// Run the example
if (require.main === module) {
  main();
}
