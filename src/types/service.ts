export interface ServiceReadOnly {
  id: number;
  clientId: number;
  organizationId: number;
  name: string;
  status: ServiceStatus;
  price: number;
  servicePlanId?: number | null;
  servicePlanName?: string | null;
  servicePlanPeriod?: number | null;
  servicePlanPrice?: number | null;
  invoicingStart?: string | null;
  invoicingEnd?: string | null;
  invoicingPeriodType?: InvoicingPeriodType;
  invoicingPeriodStartDay?: number | null;
  invoicingPeriodStartMonth?: number | null;
  invoicingPeriod?: number | null;
  nextInvoicingDayAdjustment?: number | null;
  invoicingProratedSeparately?: boolean;
  invoicingSeparately?: boolean;
  invoicingLastPeriodEnd?: string | null;
  invoicingDayAdjustment?: number | null;
  sendEmailsAutomatically?: boolean;
  useCreditAutomatically?: boolean;
  activeFrom?: string | null;
  activeTo?: string | null;
  contractId?: string | null;
  contractEndDate?: string | null;
  minimumContractLengthMonths?: number | null;
  setupFee?: number | null;
  earlyTerminationFeePrice?: number | null;
  discountType?: DiscountType | null;
  discountValue?: number | null;
  discountInvoiceLabel?: string | null;
  discountFrom?: string | null;
  discountTo?: string | null;
  taxable?: boolean;
  tax1Id?: number | null;
  tax2Id?: number | null;
  tax3Id?: number | null;
  addressGpsLat?: number | null;
  addressGpsLon?: number | null;
  street1?: string | null;
  street2?: string | null;
  city?: string | null;
  countryId?: number | null;
  stateId?: number | null;
  zipCode?: string | null;
  note?: string | null;
  createdDate?: string;
  updatedDate?: string;
  customAttributes?: ServiceCustomAttribute[];
  supersededById?: number | null;
  supersedingServiceId?: number | null;
  hasOutage?: boolean;
  downloadBurst?: number | null;
  uploadBurst?: number | null;
  downloadSpeed?: number | null;
  uploadSpeed?: number | null;
  fccBlockId?: string | null;
  downloadSpeedOverride?: number | null;
  uploadSpeedOverride?: number | null;
  tariffPeriodId?: number | null;
  dataUsageLimit?: number | null;
  invoiceItemRounding?: InvoiceItemRounding;
}

export interface ServiceWritable {
  name: string;
  servicePlanId?: number | null;
  price?: number;
  invoicingStart?: string | null;
  invoicingEnd?: string | null;
  invoicingPeriodType?: InvoicingPeriodType;
  invoicingPeriodStartDay?: number | null;
  invoicingPeriodStartMonth?: number | null;
  invoicingPeriod?: number | null;
  nextInvoicingDayAdjustment?: number | null;
  invoicingProratedSeparately?: boolean;
  invoicingSeparately?: boolean;
  invoicingDayAdjustment?: number | null;
  sendEmailsAutomatically?: boolean;
  useCreditAutomatically?: boolean;
  activeFrom?: string | null;
  activeTo?: string | null;
  contractId?: string | null;
  contractEndDate?: string | null;
  minimumContractLengthMonths?: number | null;
  setupFee?: number | null;
  earlyTerminationFeePrice?: number | null;
  discountType?: DiscountType | null;
  discountValue?: number | null;
  discountInvoiceLabel?: string | null;
  discountFrom?: string | null;
  discountTo?: string | null;
  taxable?: boolean;
  tax1Id?: number | null;
  tax2Id?: number | null;
  tax3Id?: number | null;
  addressGpsLat?: number | null;
  addressGpsLon?: number | null;
  street1?: string | null;
  street2?: string | null;
  city?: string | null;
  countryId?: number | null;
  stateId?: number | null;
  zipCode?: string | null;
  note?: string | null;
  customAttributes?: ServiceCustomAttribute[];
  downloadBurst?: number | null;
  uploadBurst?: number | null;
  downloadSpeed?: number | null;
  uploadSpeed?: number | null;
  fccBlockId?: string | null;
  downloadSpeedOverride?: number | null;
  uploadSpeedOverride?: number | null;
  tariffPeriodId?: number | null;
  dataUsageLimit?: number | null;
  invoiceItemRounding?: InvoiceItemRounding;
}

export interface ServiceUpdate {
  name?: string;
  servicePlanId?: number | null;
  price?: number;
  invoicingStart?: string | null;
  invoicingEnd?: string | null;
  invoicingPeriodType?: InvoicingPeriodType;
  invoicingPeriodStartDay?: number | null;
  invoicingPeriodStartMonth?: number | null;
  invoicingPeriod?: number | null;
  nextInvoicingDayAdjustment?: number | null;
  invoicingProratedSeparately?: boolean;
  invoicingSeparately?: boolean;
  invoicingDayAdjustment?: number | null;
  sendEmailsAutomatically?: boolean;
  useCreditAutomatically?: boolean;
  activeFrom?: string | null;
  activeTo?: string | null;
  contractId?: string | null;
  contractEndDate?: string | null;
  minimumContractLengthMonths?: number | null;
  setupFee?: number | null;
  earlyTerminationFeePrice?: number | null;
  discountType?: DiscountType | null;
  discountValue?: number | null;
  discountInvoiceLabel?: string | null;
  discountFrom?: string | null;
  discountTo?: string | null;
  taxable?: boolean;
  tax1Id?: number | null;
  tax2Id?: number | null;
  tax3Id?: number | null;
  addressGpsLat?: number | null;
  addressGpsLon?: number | null;
  street1?: string | null;
  street2?: string | null;
  city?: string | null;
  countryId?: number | null;
  stateId?: number | null;
  zipCode?: string | null;
  note?: string | null;
  customAttributes?: ServiceCustomAttribute[];
  downloadBurst?: number | null;
  uploadBurst?: number | null;
  downloadSpeed?: number | null;
  uploadSpeed?: number | null;
  fccBlockId?: string | null;
  downloadSpeedOverride?: number | null;
  uploadSpeedOverride?: number | null;
  tariffPeriodId?: number | null;
  dataUsageLimit?: number | null;
  invoiceItemRounding?: InvoiceItemRounding;
}

export interface ServiceSearchParams {
  organizationId?: number;
  clientId?: number;
  statuses?: ServiceStatus[];
  prepaid?: number;
  hasOutage?: number;
  customAttributeId?: number;
  customAttributeKey?: string;
  customAttributeValue?: string;
  limit?: number;
  offset?: number;
}

export interface ServiceActivate {
  activateDate?: string;
  setupFeeInvoiceImmediately?: boolean;
}

export interface ServicePause {
  pauseFrom: string;
  pauseTo: string;
}

export interface ServiceTrafficShapingOverride {
  downloadSpeedOverride?: number | null;
  uploadSpeedOverride?: number | null;
}

export interface ServiceUsageReadonly {
  download: number;
  upload: number;
  downloadUnit: string;
  uploadUnit: string;
}

export interface ServiceCustomAttribute {
  key: string;
  value: string;
}

export interface ServiceChangeRequest {
  serviceId: number;
  servicePlanId?: number | null;
  note?: string | null;
}

export interface ServiceChangeRequestReadOnly {
  id: string;
  serviceId: number;
  servicePlanId?: number | null;
  note?: string | null;
  createdDate: string;
  status: ServiceChangeRequestStatus;
}

export interface PrepaidServicePeriod {
  id: number;
  serviceId: number;
  invoiceId?: number | null;
  startDate: string;
  endDate: string;
  price: number;
  createdDate: string;
}

export interface PrepaidServicePeriodSearchParams {
  serviceId?: number;
  limit?: number;
  offset?: number;
  order?: "createdDate" | "startDate" | "endDate";
  direction?: "ASC" | "DESC";
  createdDateFrom?: string;
  createdDateTo?: string;
  startDateFrom?: string;
  startDateTo?: string;
  endDateFrom?: string;
  endDateTo?: string;
}

export enum ServiceStatus {
  PREPARED = 0,
  ACTIVE = 1,
  ENDED = 2,
  SUSPENDED = 3,
  PREPARED_BLOCKED = 4,
  OBSOLETE = 5,
  DEFERRED = 6,
  QUOTED = 7,
}

export enum InvoicingPeriodType {
  MONTH = 1,
  DAY = 2,
  WEEK = 3,
  FORWARD = 4,
  BACKWARD = 5,
}

export enum DiscountType {
  PERCENTAGE = 1,
  FIXED = 2,
}

export enum InvoiceItemRounding {
  STANDARD = 1,
  NO_ROUNDING = 2,
}

export enum ServiceChangeRequestStatus {
  OPEN = 1,
  APPROVED = 2,
  REJECTED = 3,
}
