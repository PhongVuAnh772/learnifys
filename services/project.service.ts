import apiService from "@/services/api.service.ts";

class ProjectService {
  async getProject(spaceId: string, projectId: string) {
    return await apiService.get(`/spaces/${spaceId}/projects/${projectId}`);
  }

  async inviteMember(spaceId: string, projectId: string, memberId: string) {
    return await apiService.post(`/spaces/${spaceId}/projects/${projectId}/members`, { memberId });
  }

  async updateProjectCover (spaceId: string, projectId: string, avatar: any) {
    return await apiService.put(`/spaces/${spaceId}/projects/${projectId}/avatar`, avatar);
  }

  async removeMember (spaceId: string, projectId: string, memberId: string) {
    return await apiService.delete(`/spaces/${spaceId}/projects/${projectId}/members`, { memberId });
  }

  async updateProject(spaceId: string, projectId: string, payload: {name?: string, description?: string}) {
    return await apiService.put(`/spaces/${spaceId}/projects/${projectId}`, payload);
  }

  async removeProject(spaceId: string, projectId: string) {
    return await apiService.delete(`/spaces/${spaceId}/projects/${projectId}`)
  }

  async getProjectLabels(spaceId: string, projectId: string) {
    return await apiService.get(`/spaces/${spaceId}/projects/${projectId}/labels`)
  }
}

export default new ProjectService();
