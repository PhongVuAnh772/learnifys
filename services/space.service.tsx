import apiService from "@/services/api.service.ts";

class SpaceService {
  async getMemberById (spaceId: string, memberId: string) {
    return await apiService.get(`spaces/${spaceId}/members/${memberId}`);
  }
}

export default new SpaceService();
