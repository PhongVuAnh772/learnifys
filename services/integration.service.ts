import apiService from "@/services/api.service.ts";

class IntegrationService {
  async getIntegrations(spaceId: string) {
    return await apiService.get(`spaces/${spaceId}/integrations`);
  }

  async enableIntegration(spaceId: string, type: IntegrationType, data: Integration['data'] & { enabled: boolean }) {
    return await apiService.put(`spaces/${spaceId}/integrations/${type}`, data);
  }

  async getEmailDomains(spaceId: string, integrationId: string) {
    return await apiService.get(`spaces/${spaceId}/email-domains?integration=${integrationId}`);
  }
}

export default new IntegrationService();
