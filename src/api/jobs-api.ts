import { HttpClient } from "../http/http-client";
import {
  JobReadOnly,
  JobWritable,
  JobSearchParams,
  JobCommentReadOnly,
  JobCommentWritable,
  JobCommentSearchParams,
  JobTaskReadOnly,
  JobTaskWritable,
  JobTaskSearchParams,
  JobAttachmentReadOnly,
  JobAttachmentWritable,
  JobAttachmentSearchParams,
  ApiResponse,
} from "../types";

export class JobsApi {
  constructor(private httpClient: HttpClient) {}

  /**
   * Retrieve collection of Jobs
   */
  async getJobs(params?: JobSearchParams): Promise<ApiResponse<JobReadOnly[]>> {
    const queryString = params ? this.httpClient.buildQueryString(params) : "";
    return this.httpClient.get<JobReadOnly[]>(`/scheduling/jobs${queryString}`);
  }

  /**
   * Create Job
   */
  async createJob(job: JobWritable): Promise<ApiResponse<JobReadOnly>> {
    return this.httpClient.post<JobReadOnly, JobWritable>(
      "/scheduling/jobs",
      job
    );
  }

  /**
   * Retrieve specific Job by ID
   */
  async getJob(id: number): Promise<ApiResponse<JobReadOnly>> {
    return this.httpClient.get<JobReadOnly>(`/scheduling/jobs/${id}`);
  }

  /**
   * Update Job
   */
  async updateJob(
    id: number,
    job: JobWritable
  ): Promise<ApiResponse<JobReadOnly>> {
    return this.httpClient.patch<JobReadOnly, JobWritable>(
      `/scheduling/jobs/${id}`,
      job
    );
  }

  /**
   * Delete Job
   */
  async deleteJob(id: number): Promise<ApiResponse<void>> {
    return this.httpClient.delete<void>(`/scheduling/jobs/${id}`);
  }
}

export class JobCommentsApi {
  constructor(private httpClient: HttpClient) {}

  /**
   * Retrieve collection of Job Comments
   */
  async getJobComments(
    params?: JobCommentSearchParams
  ): Promise<ApiResponse<JobCommentReadOnly[]>> {
    const queryString = params ? this.httpClient.buildQueryString(params) : "";
    return this.httpClient.get<JobCommentReadOnly[]>(
      `/scheduling/jobs/comments${queryString}`
    );
  }

  /**
   * Create Job Comment
   */
  async createJobComment(
    comment: JobCommentWritable
  ): Promise<ApiResponse<JobCommentReadOnly>> {
    return this.httpClient.post<JobCommentReadOnly, JobCommentWritable>(
      "/scheduling/jobs/comments",
      comment
    );
  }

  /**
   * Retrieve specific Job Comment by ID
   */
  async getJobComment(id: number): Promise<ApiResponse<JobCommentReadOnly>> {
    return this.httpClient.get<JobCommentReadOnly>(
      `/scheduling/jobs/comments/${id}`
    );
  }

  /**
   * Update Job Comment
   */
  async updateJobComment(
    id: number,
    comment: JobCommentWritable
  ): Promise<ApiResponse<JobCommentReadOnly>> {
    return this.httpClient.patch<JobCommentReadOnly, JobCommentWritable>(
      `/scheduling/jobs/comments/${id}`,
      comment
    );
  }

  /**
   * Delete Job Comment
   */
  async deleteJobComment(id: number): Promise<ApiResponse<void>> {
    return this.httpClient.delete<void>(`/scheduling/jobs/comments/${id}`);
  }
}

export class JobTasksApi {
  constructor(private httpClient: HttpClient) {}

  /**
   * Retrieve collection of Job Tasks
   */
  async getJobTasks(
    params: JobTaskSearchParams
  ): Promise<ApiResponse<JobTaskReadOnly[]>> {
    const queryString = this.httpClient.buildQueryString(params);
    return this.httpClient.get<JobTaskReadOnly[]>(
      `/scheduling/jobs/tasks${queryString}`
    );
  }

  /**
   * Create Job Task
   */
  async createJobTask(
    task: JobTaskWritable
  ): Promise<ApiResponse<JobTaskReadOnly>> {
    return this.httpClient.post<JobTaskReadOnly, JobTaskWritable>(
      "/scheduling/jobs/tasks",
      task
    );
  }

  /**
   * Retrieve specific Job Task by ID
   */
  async getJobTask(id: number): Promise<ApiResponse<JobTaskReadOnly>> {
    return this.httpClient.get<JobTaskReadOnly>(`/scheduling/jobs/tasks/${id}`);
  }

  /**
   * Update Job Task
   */
  async updateJobTask(
    id: number,
    task: JobTaskWritable
  ): Promise<ApiResponse<JobTaskReadOnly>> {
    return this.httpClient.patch<JobTaskReadOnly, JobTaskWritable>(
      `/scheduling/jobs/tasks/${id}`,
      task
    );
  }

  /**
   * Delete Job Task
   */
  async deleteJobTask(id: number): Promise<ApiResponse<void>> {
    return this.httpClient.delete<void>(`/scheduling/jobs/tasks/${id}`);
  }
}

export class JobAttachmentsApi {
  constructor(private httpClient: HttpClient) {}

  /**
   * Retrieve collection of Job Attachments
   */
  async getJobAttachments(
    params?: JobAttachmentSearchParams
  ): Promise<ApiResponse<JobAttachmentReadOnly[]>> {
    const queryString = params ? this.httpClient.buildQueryString(params) : "";
    return this.httpClient.get<JobAttachmentReadOnly[]>(
      `/scheduling/jobs/attachments${queryString}`
    );
  }

  /**
   * Create Job Attachment
   */
  async createJobAttachment(
    attachment: JobAttachmentWritable
  ): Promise<ApiResponse<JobAttachmentReadOnly>> {
    return this.httpClient.post<JobAttachmentReadOnly, JobAttachmentWritable>(
      "/scheduling/jobs/attachments",
      attachment
    );
  }

  /**
   * Retrieve specific Job Attachment by ID
   */
  async getJobAttachment(
    id: number
  ): Promise<ApiResponse<JobAttachmentReadOnly>> {
    return this.httpClient.get<JobAttachmentReadOnly>(
      `/scheduling/jobs/attachments/${id}`
    );
  }

  /**
   * Update Job Attachment
   */
  async updateJobAttachment(
    id: number,
    attachment: JobAttachmentWritable
  ): Promise<ApiResponse<JobAttachmentReadOnly>> {
    return this.httpClient.patch<JobAttachmentReadOnly, JobAttachmentWritable>(
      `/scheduling/jobs/attachments/${id}`,
      attachment
    );
  }

  /**
   * Delete Job Attachment
   */
  async deleteJobAttachment(id: number): Promise<ApiResponse<void>> {
    return this.httpClient.delete<void>(`/scheduling/jobs/attachments/${id}`);
  }

  /**
   * Retrieve Job Attachment file
   */
  async getJobAttachmentFile(id: number): Promise<ArrayBuffer> {
    return this.httpClient.downloadFile(
      `/scheduling/jobs/attachments/${id}/file`
    );
  }
}
