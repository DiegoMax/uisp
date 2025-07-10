import { HttpClient } from "../http/http-client";
import {
  CreditNoteReadOnly,
  CreditNoteNew,
  CreditNoteUpdate,
  CreditNoteSearchParams,
  CreditNoteTemplateReadOnly,
  ApiResponse,
} from "../types";

export class CreditNotesApi {
  constructor(private httpClient: HttpClient) {}

  /**
   * Retrieve collection of Credit Notes
   */
  async getCreditNotes(
    params?: CreditNoteSearchParams
  ): Promise<ApiResponse<CreditNoteReadOnly[]>> {
    const queryString = params ? this.httpClient.buildQueryString(params) : "";
    return this.httpClient.get<CreditNoteReadOnly[]>(
      `/credit-notes${queryString}`
    );
  }

  /**
   * Retrieve specific Credit Note by ID
   */
  async getCreditNote(id: number): Promise<ApiResponse<CreditNoteReadOnly>> {
    return this.httpClient.get<CreditNoteReadOnly>(`/credit-notes/${id}`);
  }

  /**
   * Update Credit Note
   */
  async updateCreditNote(
    id: number,
    creditNote: CreditNoteUpdate
  ): Promise<ApiResponse<CreditNoteReadOnly>> {
    return this.httpClient.patch<CreditNoteReadOnly, CreditNoteUpdate>(
      `/credit-notes/${id}`,
      creditNote
    );
  }

  /**
   * Delete Credit Note permanently
   */
  async deleteCreditNote(id: number): Promise<ApiResponse<void>> {
    return this.httpClient.delete<void>(`/credit-notes/${id}`);
  }

  /**
   * Create Credit Note for Client
   */
  async createCreditNoteForClient(
    clientId: number,
    creditNote: CreditNoteNew
  ): Promise<ApiResponse<CreditNoteReadOnly>> {
    return this.httpClient.post<CreditNoteReadOnly, CreditNoteNew>(
      `/clients/${clientId}/credit-note`,
      creditNote
    );
  }

  /**
   * Send Credit Note to client
   */
  async sendCreditNote(id: number): Promise<ApiResponse<CreditNoteReadOnly>> {
    return this.httpClient.patch<CreditNoteReadOnly>(
      `/credit-notes/${id}/send`
    );
  }

  /**
   * Regenerate PDF of Credit Note
   */
  async regenerateCreditNotePdf(
    id: number,
    refreshData?: boolean
  ): Promise<ApiResponse<CreditNoteReadOnly>> {
    const queryString = refreshData ? "?refreshData=1" : "";
    return this.httpClient.patch<CreditNoteReadOnly>(
      `/credit-notes/${id}/regenerate-pdf${queryString}`
    );
  }

  /**
   * Retrieve Credit Note PDF
   */
  async getCreditNotePdf(id: number): Promise<ArrayBuffer> {
    return this.httpClient.downloadFile(`/credit-notes/${id}/pdf`);
  }

  // Credit Note Templates methods
  /**
   * Get collection of Credit Note Templates
   */
  async getCreditNoteTemplates(params?: {
    limit?: number;
    offset?: number;
  }): Promise<ApiResponse<CreditNoteTemplateReadOnly[]>> {
    const queryString = params ? this.httpClient.buildQueryString(params) : "";
    return this.httpClient.get<CreditNoteTemplateReadOnly[]>(
      `/credit-note-templates${queryString}`
    );
  }

  /**
   * Get Credit Note Template by ID
   */
  async getCreditNoteTemplate(
    id: number
  ): Promise<ApiResponse<CreditNoteTemplateReadOnly>> {
    return this.httpClient.get<CreditNoteTemplateReadOnly>(
      `/credit-note-templates/${id}`
    );
  }
}
