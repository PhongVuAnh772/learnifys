import apiService from "@/services/api.service.ts";
import {Task} from "@/types/task.ts";

class TaskService {
  async archiveTask(spaceId: string, task: Task) {
    const data = {
      ...task,
      attachments: task.attachments.map(item => item._id),
      labels: task.labels.map(item => item._id),
      assignees: task.assignees.map(item => item._id),
      archived: true,
    };
    return await apiService.put(`spaces/${spaceId}/tasks/${task._id}`, data);
  }

  async getTaskActivities(spaceId: string, task: Task) {
    return await apiService.get(`spaces/${spaceId}/tasks/${task._id}/activities`);
  }
}

export default new TaskService();
