import { BaseEntity } from "./base";

// Client related types
export interface ClientWritable {
  organizationId?: number;
  userIdent?: string;
  previousIsp?: string;
  isLead?: boolean;
  clientType?: number;
  companyName?: string;
  companyRegistrationNumber?: string;
  companyTaxId?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  password?: string;
  email?: string;
  phone?: string;
  street1?: string;
  street2?: string;
  city?: string;
  countryId?: number;
  stateId?: number;
  zipCode?: string;
  note?: string;
  sendInvoiceByPost?: boolean;
  invoiceMaturityDays?: number;
  stopServiceDue?: boolean;
  stopServiceDueDelayed?: boolean;
  taxId?: string;
  generateInvoices?: boolean;
  addressGpsLat?: number;
  addressGpsLon?: number;
  companyContactFirstName?: string;
  companyContactLastName?: string;
  isActive?: boolean;
  avatarColor?: string;
  customAttributes?: Record<string, unknown>;
}

export interface ClientReadOnly extends BaseEntity {
  organizationId: number;
  userIdent: string;
  previousIsp: string | null;
  isLead: boolean;
  clientType: number;
  companyName: string | null;
  companyRegistrationNumber: string | null;
  companyTaxId: string | null;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string | null;
  street1: string | null;
  street2: string | null;
  city: string | null;
  countryId: number | null;
  stateId: number | null;
  zipCode: string | null;
  note: string | null;
  sendInvoiceByPost: boolean;
  invoiceMaturityDays: number;
  stopServiceDue: boolean;
  stopServiceDueDelayed: boolean;
  taxId: string | null;
  registrationDate: string;
  generateInvoices: boolean;
  addressGpsLat: number | null;
  addressGpsLon: number | null;
  companyContactFirstName: string | null;
  companyContactLastName: string | null;
  isActive: boolean;
  avatarColor: string;
  hasOverdueInvoice: boolean;
  accountBalance: number;
  accountOutstanding: number;
  accountCredit: number;
  currencyCode: string;
  organizationName: string;
  organizationCountryId: number;
  organizationStateId: number;
  customAttributes: Record<string, unknown>;
  tags: ClientTag[];
}

export interface ClientSearchParams {
  organizationId?: number;
  userIdent?: string;
  customAttributeKey?: string;
  customAttributeValue?: string;
  lead?: number;
  email?: string;
  phone?: string;
  username?: string;
  isArchived?: number;
  query?: string;
  clientTagIds?: number[];
  uninvoicedFeeTypes?: number[];
  limit?: number;
  offset?: number;
  order?: string;
  direction?: "ASC" | "DESC";
}

export interface ClientCredentials {
  username: string;
  password: string;
}

// Client Bank Account types
export interface ClientBankAccount {
  name?: string;
  field1?: string;
  field2?: string;
  field3?: string;
  field4?: string;
  field5?: string;
}

export interface ClientBankAccountReadOnly extends BaseEntity {
  clientId: number;
  name: string;
  field1: string | null;
  field2: string | null;
  field3: string | null;
  field4: string | null;
  field5: string | null;
}

// Client Contact types
export interface ClientContactWritable {
  name?: string;
  email?: string;
  phone?: string;
  isBilling?: boolean;
  isContact?: boolean;
  types?: number[];
}

export interface ClientContactReadOnly extends BaseEntity {
  clientId: number;
  name: string;
  email: string | null;
  phone: string | null;
  isBilling: boolean;
  isContact: boolean;
  types: number[];
}

// Client Tag types
export interface ClientTag {
  name: string;
  colorBackground?: string;
  colorText?: string;
}

export interface ClientTagReadOnly extends BaseEntity {
  name: string;
  colorBackground: string;
  colorText: string;
}

// Client Logs types
export interface ClientLogsWritable {
  clientId?: number;
  message?: string;
  userId?: number;
}

export interface ClientLogsReadOnly extends BaseEntity {
  clientId: number;
  message: string;
  userId: number | null;
  userFullName: string | null;
}

export interface ClientLogsSearchParams {
  clientId?: number;
  createdDateFrom?: string;
  createdDateTo?: string;
}
