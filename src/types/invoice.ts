import { BaseEntity } from "./base";

// Invoice types
export interface InvoiceNew {
  organizationId?: number;
  invoiceTemplateId?: number;
  maturityDays?: number;
  notes?: string;
  adminNotes?: string;
  discount?: number;
  discountLabel?: string;
  invoiceItems?: InvoiceItemNew[];
  customAttributes?: Record<string, unknown>;
}

export interface InvoiceUpdate {
  organizationId?: number;
  invoiceTemplateId?: number;
  maturityDays?: number;
  notes?: string;
  adminNotes?: string;
  discount?: number;
  discountLabel?: string;
  invoiceItems?: InvoiceItemWritable[];
  customAttributes?: Record<string, unknown>;
}

export interface InvoiceReadOnly extends BaseEntity {
  clientId: number;
  organizationId: number;
  number: string;
  clientFirstName: string;
  clientLastName: string;
  clientCompanyName: string | null;
  clientUserIdent: string;
  total: number;
  amountPaid: number;
  status: number;
  createdDate: string;
  emailSentDate: string | null;
  maturityDate: string;
  invoiceTemplateId: number;
  organizationName: string;
  organizationRegistrationNumber: string | null;
  organizationTaxId: string | null;
  organizationStreet1: string | null;
  organizationStreet2: string | null;
  organizationCity: string | null;
  organizationCountryId: number | null;
  organizationStateId: number | null;
  organizationZipCode: string | null;
  organizationBankAccountName: string | null;
  organizationBankAccountField1: string | null;
  organizationBankAccountField2: string | null;
  currencyCode: string;
  discount: number | null;
  discountLabel: string | null;
  notes: string | null;
  adminNotes: string | null;
  proforma: boolean;
  customAttributes: Record<string, unknown>;
  invoiceItems: InvoiceItemReadOnly[];
}

export interface InvoiceReadOnlyPreview extends InvoiceReadOnly {
  // Preview-specific fields could be added here
}

export interface InvoiceSearchParams {
  organizationId?: number;
  clientId?: number;
  createdDateFrom?: string;
  createdDateTo?: string;
  statuses?: number[];
  number?: string;
  overdue?: number;
  proforma?: number;
  customAttributeKey?: string;
  customAttributeValue?: string;
  query?: string;
  limit?: number;
  offset?: number;
  order?: string;
  direction?: "ASC" | "DESC";
}

// Invoice Item types
export interface InvoiceItemNew {
  type?: string;
  label?: string;
  price?: number;
  quantity?: number;
  unit?: string;
  taxRate1?: number;
  taxRate2?: number;
  taxRate3?: number;
  discountPercent?: number;
  discountInvoiceLabel?: string;
  discountValue?: number;
  productId?: number;
}

export interface InvoiceItemWritable {
  id?: number;
  type?: string;
  label?: string;
  price?: number;
  quantity?: number;
  unit?: string;
  taxRate1?: number;
  taxRate2?: number;
  taxRate3?: number;
  discountPercent?: number;
  discountInvoiceLabel?: string;
  discountValue?: number;
  productId?: number;
}

export interface InvoiceItemReadOnly extends BaseEntity {
  invoiceId: number;
  type: string;
  label: string;
  price: number;
  quantity: number;
  unit: string | null;
  taxRate1: number | null;
  taxRate2: number | null;
  taxRate3: number | null;
  discountPercent: number | null;
  discountInvoiceLabel: string | null;
  discountValue: number | null;
  total: number;
  totalDiscount: number;
  totalTax: number;
  productId: number | null;
}

// Invoice Template types
export interface InvoiceTemplateReadOnly extends BaseEntity {
  organizationId: number;
  name: string;
  createdDate: string;
  isValid: boolean;
  officialName: string | null;
}
