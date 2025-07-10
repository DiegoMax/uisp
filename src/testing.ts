import { UispCrmClient } from "./uisp-crm-client";

// Quick start example for UISP CRM API client
export async function quickStartExample() {
  // Initialize the client with your UISP instance details
  const client = new UispCrmClient({
    baseUrl: "https://control.fdinternet.com/crm/api/v1.0",
    appKey: "mfx1UzccC6lM6xWEmACsJ6yEJzqvtlw8cOLUBi/8wahCt6r/El0MeEOBzO88foV6",
  });

  // Example usage: Fetch all clients
  try {
    console.log("Fetching clients...");
    const clients = await client.clients.getClients({ limit: 10 });
    console.log("Clients:", clients);
  } catch (error) {
    console.error("Error fetching clients:", error);
  }
}

quickStartExample();
