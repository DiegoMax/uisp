import { BaseEntity } from "./base";

// Credit Note types
export interface CreditNoteNew {
  organizationId?: number;
  creditNoteTemplateId?: number;
  number?: string;
  notes?: string;
  adminNotes?: string;
  discount?: number;
  discountLabel?: string;
  creditNoteItems?: CreditNoteItemNew[];
}

export interface CreditNoteUpdate {
  organizationId?: number;
  creditNoteTemplateId?: number;
  number?: string;
  notes?: string;
  adminNotes?: string;
  discount?: number;
  discountLabel?: string;
  creditNoteItems?: CreditNoteItemWritable[];
}

export interface CreditNoteReadOnly extends BaseEntity {
  clientId: number;
  organizationId: number;
  number: string;
  clientFirstName: string;
  clientLastName: string;
  clientCompanyName: string | null;
  clientUserIdent: string;
  total: number;
  createdDate: string;
  emailSentDate: string | null;
  creditNoteTemplateId: number;
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
  creditNoteItems: CreditNoteItemReadOnly[];
}

export interface CreditNoteSearchParams {
  organizationId?: number;
  clientId?: number;
  createdDateFrom?: string;
  createdDateTo?: string;
  number?: string;
  query?: string;
  limit?: number;
  offset?: number;
  order?: string;
  direction?: "ASC" | "DESC";
}

// Credit Note Item types
export interface CreditNoteItemNew {
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

export interface CreditNoteItemWritable {
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

export interface CreditNoteItemReadOnly extends BaseEntity {
  creditNoteId: number;
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

// Credit Note Template types
export interface CreditNoteTemplateReadOnly extends BaseEntity {
  organizationId: number;
  name: string;
  createdDate: string;
  isValid: boolean;
  officialName: string | null;
}
