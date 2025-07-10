import { UispCrmClient } from "../src";

// Basic usage example
async function basicExample() {
  // Initialize the client
  const client = new UispCrmClient({
    baseUrl: "https://your-uisp-instance.com/crm/api/v1.0",
    appKey: "your-app-key-here",
    timeout: 30000, // Optional: request timeout in ms
  });

  try {
    // Test connection
    const isConnected = await client.testConnection();
    console.log("Connection test:", isConnected ? "SUCCESS" : "FAILED");

    // Get all clients
    const clientsResponse = await client.clients.getClients({
      limit: 10,
      offset: 0,
      order: "user.lastName",
      direction: "ASC",
    });
    console.log("Clients:", clientsResponse.data);

    // Create a new client
    const newClient = await client.clients.createClient({
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "+1234567890",
      organizationId: 1,
    });
    console.log("Created client:", newClient.data);

    // Update the client
    const updatedClient = await client.clients.updateClient(newClient.data.id, {
      note: "Updated via API",
    });
    console.log("Updated client:", updatedClient.data);

    // Get client's invoices
    const invoices = await client.invoices.getInvoices({
      clientId: newClient.data.id,
      limit: 5,
    });
    console.log("Client invoices:", invoices.data);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Advanced usage with error handling
async function advancedExample() {
  const crmClient = new UispCrmClient({
    baseUrl: process.env.UISP_BASE_URL!,
    appKey: process.env.UISP_APP_KEY!,
  });

  try {
    // Search for clients with specific criteria
    const searchResults = await crmClient.clients.getClients({
      query: "john",
      isArchived: 0,
      limit: 20,
    });

    // Process each client
    for (const clientData of searchResults.data) {
      console.log(
        `Processing client: ${clientData.firstName} ${clientData.lastName}`
      );

      // Get client's bank accounts
      const bankAccounts = await crmClient.clients.getClientBankAccounts(
        clientData.id
      );
      console.log(`  Bank accounts: ${bankAccounts.data.length}`);

      // Get client's contacts
      const contacts = await crmClient.clients.getClientContacts(clientData.id);
      console.log(`  Contacts: ${contacts.data.length}`);

      // Get client's logs
      const logs = await crmClient.clients.getClientLogs({
        clientId: clientData.id,
        createdDateFrom: "2024-01-01",
      });
      console.log(`  Log entries: ${logs.data.length}`);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error message:", error.message);
    } else {
      console.error("Unknown error:", error);
    }
  }
}

// Invoice management example
async function invoiceExample() {
  const client = new UispCrmClient({
    baseUrl: process.env.UISP_BASE_URL!,
    appKey: process.env.UISP_APP_KEY!,
  });

  try {
    const clientId = 1; // Replace with actual client ID

    // Create a new invoice
    const newInvoice = await client.invoices.createInvoiceForClient(clientId, {
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
          taxRate1: 10, // 10% tax
        },
      ],
    });

    console.log("Created invoice:", newInvoice.data.number);

    // Send the invoice to the client
    await client.invoices.sendInvoice(newInvoice.data.id);
    console.log("Invoice sent to client");

    // Download invoice PDF
    const pdfBuffer = await client.invoices.getInvoicePdf(newInvoice.data.id);
    console.log("Downloaded PDF, size:", pdfBuffer.byteLength, "bytes");
  } catch (error) {
    console.error("Invoice error:", error);
  }
}

// Organization and payment methods example
async function organizationExample() {
  const client = new UispCrmClient({
    baseUrl: process.env.UISP_BASE_URL!,
    appKey: process.env.UISP_APP_KEY!,
  });

  try {
    // Get all organizations
    const organizations = await client.organizations.getOrganizations();
    console.log("Organizations:", organizations.data.length);

    if (organizations.data.length > 0) {
      const org = organizations.data[0];

      // Get next invoice number
      const nextInvoiceNumber = await client.organizations.getNextInvoiceNumber(
        org.id
      );
      console.log(
        "Next invoice number:",
        nextInvoiceNumber.data.nextInvoiceNumber
      );
    }

    // Get payment methods
    const paymentMethods = await client.paymentMethods.getPaymentMethods({
      visible: true,
    });
    console.log("Payment methods:", paymentMethods.data);
  } catch (error) {
    console.error("Organization error:", error);
  }
}

// Job scheduling example
async function jobExample() {
  const client = new UispCrmClient({
    baseUrl: process.env.UISP_BASE_URL!,
    appKey: process.env.UISP_APP_KEY!,
  });

  try {
    // Create a new job
    const newJob = await client.jobs.createJob({
      title: "Installation Service",
      description: "Install new internet service for customer",
      clientId: 1, // Replace with actual client ID
      assignedUserId: 1, // Replace with actual user ID
      date: "2024-12-01T10:00:00Z",
      duration: 120, // 2 hours in minutes
      status: 1, // Scheduled
    });

    console.log("Created job:", newJob.data.title);

    // Add a comment to the job
    await client.jobComments.createJobComment({
      jobId: newJob.data.id,
      message: "Job scheduled with customer",
    });

    // Add a task to the job
    await client.jobTasks.createJobTask({
      jobId: newJob.data.id,
      label: "Verify equipment compatibility",
      closed: false,
    });

    console.log("Job created with comment and task");
  } catch (error) {
    console.error("Job error:", error);
  }
}

// Run examples (uncomment to test)
// basicExample();
// advancedExample();
// invoiceExample();
// organizationExample();
// jobExample();
