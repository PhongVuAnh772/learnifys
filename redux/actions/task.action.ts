import {createAsyncThunk} from "@reduxjs/toolkit";
import {store} from "@/redux/store.ts";
import apiService from "@/services/api.service.ts";
import {Task, TaskPriority, TaskStatus, TaskTypes} from "@/types/task.ts";
import taskService from "@/services/task.service.ts";
import {Filters} from "@/screens/tabs/Tasks/hooks/useTaskFilters.ts";

export const loadTasks = createAsyncThunk<
  {
    data: Task[],
    pagination: Pagination
  },
  {
    reload: boolean,
    filters?: Filters,
    assignees?: string[],
    project?: string
  }
>
("task/load-tasks", async ({
  reload,
  filters,
  assignees,
  project,
}) => {
  const currentSpace = store.getState().space.currentSpace;
  const {pagination} = store.getState().task;

  if (!currentSpace) {
    throw Error("Current space is required");
  }
  if (!reload && !pagination.hasNext) {
    throw Error("No more data");
  }

  return await apiService.get(`spaces/${currentSpace?._id}/tasks`, undefined, {
    params: {
      query: filters?.query,
      type: filters?.types?.join(',') || TaskTypes.ALL,
      status: filters?.statuses?.join(',') || TaskStatus.ALL,
      priority: filters?.priorities?.join(',') || TaskPriority.ALL,
      assignees: assignees?.join(',') || undefined,
      project: project,
      limit: 20,
      archived: false,
      page: reload ? 1 : pagination.page + 1,
    },
  });
});

export const loadComments = createAsyncThunk<
  any,
  string
>("task/load-comment", async (taskId) => {
  const currentSpace = store.getState().space.currentSpace;
  return await apiService.callApi("GET", `spaces/${currentSpace?._id}/tasks/${taskId}/comments`);
});

export const postComment = createAsyncThunk<
  any,
  { text: string, taskId: string }
>("task/post-comment", async ({text, taskId}) => {
  const currentSpace = store.getState().space.currentSpace;
  return await apiService.callApi("POST", `spaces/${currentSpace?._id}/tasks/${taskId}/comments`, {text});
});

export const createTask = createAsyncThunk<
  any,
  any
>('task/create', async (payload) => {
  const currentSpace = store.getState().space.currentSpace;
  return await apiService.callApi("POST", `spaces/${currentSpace?._id}/tasks`, payload);
});

export const updateTask = createAsyncThunk<
  any,
  { payload: Task, taskId: string }
>('task/update', async ({payload, taskId}) => {
  const currentSpace = store.getState().space.currentSpace;
  return await apiService.callApi("PUT", `spaces/${currentSpace?._id}/tasks/${taskId}`, payload);
});

export const archiveTask = createAsyncThunk<
  void,
  Task
>('task/update', async (task) => {
  try {
    const currentSpace = store.getState().space.currentSpace;
    if (!currentSpace) {
      throw Error("CurrentSpace is required");
    }
    return await taskService.archiveTask(currentSpace._id, task);
  } catch (e) {
    console.log(e);
  }
});



