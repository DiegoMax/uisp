import { BaseEntity } from "./base";

// Job types
export interface JobWritable {
  title?: string;
  description?: string;
  assignedUserId?: number;
  clientId?: number;
  ticketId?: number;
  date?: string;
  duration?: number;
  status?: number;
}

export interface JobReadOnly extends BaseEntity {
  title: string;
  description: string | null;
  assignedUserId: number | null;
  assignedUserFirstName: string | null;
  assignedUserLastName: string | null;
  clientId: number | null;
  clientFirstName: string | null;
  clientLastName: string | null;
  ticketId: number | null;
  date: string;
  duration: number | null;
  status: number;
}

export interface JobSearchParams {
  clientId?: number | string; // Can be "null" for unassigned
  assignedUserId?: number;
  ticketId?: number;
  dateFrom?: string;
  dateTo?: string;
  statuses?: number[];
  query?: string;
  limit?: number;
  offset?: number;
}

// Job Comment types
export interface JobCommentWritable {
  jobId?: number;
  message?: string;
}

export interface JobCommentReadOnly extends BaseEntity {
  jobId: number;
  userId: number;
  userFirstName: string;
  userLastName: string;
  message: string;
}

export interface JobCommentSearchParams {
  jobId?: number;
  userId?: number;
  createdDateFrom?: string;
  createdDateTo?: string;
}

// Job Task types
export interface JobTaskWritable {
  jobId?: number;
  label?: string;
  closed?: boolean;
}

export interface JobTaskReadOnly extends BaseEntity {
  jobId: number;
  label: string;
  closed: boolean;
}

export interface JobTaskSearchParams {
  jobId: number; // Required for job tasks
}

// Job Attachment types
export interface JobAttachmentWritable {
  jobId?: number;
  filename?: string;
  file?: string; // Base64 encoded file content
  size?: number;
  mimeType?: string;
}

export interface JobAttachmentReadOnly extends BaseEntity {
  jobId: number;
  filename: string;
  size: number;
  mimeType: string;
}

export interface JobAttachmentSearchParams {
  jobId?: number;
}
