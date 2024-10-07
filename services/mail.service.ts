import apiService from "@/services/api.service.ts";
import {EmailAddress} from "@/types/mail.ts";

class MailService {
  getEmails(spaceId: string, address: string, labels: string, limit: number = 10, page: number = 1, sortBy: string = 'createdAt', sortType: string = 'desc') {
    return apiService.get(`/spaces/${spaceId}/emails`, undefined, {
      params: {
        address,
        labels,
        limit,
        page,
        sortBy,
        sortType,
      },
    });
  }

  async getEmailAddress(spaceId: string): Promise<EmailAddress[]> {
    const {data} = await apiService.callApi('GET', `spaces/${spaceId}/email-addresses`);
    return data;
  }
}

export default new MailService();
