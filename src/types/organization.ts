import { BaseEntity } from "./base";

// Organization types
export interface OrganizationWritable {
  name?: string;
  registrationNumber?: string;
  taxId?: string;
  phone?: string;
  email?: string;
  website?: string;
  street1?: string;
  street2?: string;
  city?: string;
  countryId?: number;
  stateId?: number;
  zipCode?: string;
  bankAccountName?: string;
  bankAccountField1?: string;
  bankAccountField2?: string;
  logoStamp?: string;
  stamp?: string;
  selected?: boolean;
}

export interface OrganizationReadOnly extends BaseEntity {
  name: string;
  registrationNumber: string | null;
  taxId: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  street1: string | null;
  street2: string | null;
  city: string | null;
  countryId: number | null;
  stateId: number | null;
  zipCode: string | null;
  bankAccountName: string | null;
  bankAccountField1: string | null;
  bankAccountField2: string | null;
  logoStamp: string | null;
  stamp: string | null;
  selected: boolean;
  currencyCode: string;
}

export interface NextInvoiceNumber {
  nextInvoiceNumber: string;
}

export interface NextProformaInvoiceNumber {
  nextProformaInvoiceNumber: string;
}

export interface NextQuoteNumber {
  nextQuoteNumber: string;
}

// Payment Method types
export interface PaymentMethodWritable {
  name?: string;
  method?: string;
  enabled?: boolean;
  visible?: boolean;
}

export interface PaymentMethodReadOnly extends BaseEntity {
  name: string;
  method: string;
  enabled: boolean;
  visible: boolean;
  isSystem: boolean;
}

export interface PaymentMethodSearchParams {
  visible?: boolean;
  isSystem?: boolean;
}

// Payment Plan types
export interface PaymentPlanWritable {
  name?: string;
  organizationId?: number;
  periodDays?: number;
  smallestPeriod?: boolean;
  active?: boolean;
}

export interface PaymentPlanReadOnly extends BaseEntity {
  name: string;
  organizationId: number;
  periodDays: number;
  smallestPeriod: boolean;
  active: boolean;
}

// Fee types
export interface Fee extends BaseEntity {
  clientId: number;
  type: number;
  name: string;
  price: number;
  taxable: boolean;
  invoiceId: number | null;
  invoiceLabel: string | null;
  createdDate: string;
  invoiceItemId: number | null;
}

export interface FeeSearchParams {
  limit?: number;
  offset?: number;
  clientId?: number;
  type?: number;
  invoiced?: number;
}
