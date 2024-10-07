import { createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "@/services/api.service.ts";
import { CreateProject, LoadProject, ProjectLabel } from "@/types/project.ts";
import { objectToParams } from "@/utils";
import { store } from "@/redux/store.ts";
import { SpaceRole } from "@/types/space.ts";
import projectService from "@/services/project.service.ts";

export const loadProjects = createAsyncThunk(
  "project/load",
  async (payload?: LoadProject) => {
    const { currentSpace } = store.getState().space;
    if (!currentSpace) {
      throw Error("Current space is required");
    }
    const params = objectToParams({
      sortBy: "createdAt",
      ...payload
    });
    return await apiService.get(`/spaces/${currentSpace._id}/projects?${params}`);
  }
);

export const loadMoreProjects = createAsyncThunk(
  "project/loadMore",
  async (payload: LoadProject) => {
    const { currentSpace } = store.getState().space;
    if (!currentSpace) {
      throw Error("Current space is required");
    }

    const params = objectToParams({
      sortBy: "createdAt",
      ...payload
    });
    return await apiService.get(`/spaces/${currentSpace._id}/projects?${params}`);
  }
);

export const createProject = createAsyncThunk(
  "project/create",
  async (payload: CreateProject) => {

    return await apiService.post(`/spaces/${payload.spaceId}/projects`, payload);
  }
);


export const loadSingleProject = createAsyncThunk("project/loadSingle", async (payload: {
  projectId: string
}) => {
  const { currentSpace } = store.getState().space;
  if (!currentSpace) {
    throw Error("Current space is required");
  }
  return await apiService.get(`/spaces/${currentSpace._id}/projects/${payload.projectId}`);
});

export const loadProjectMembers = createAsyncThunk<
  any,
  string
>("project/load-members", async (projectId) => {
  const { currentSpace } = store.getState().space;
  if (!currentSpace) {
    throw Error("Current space is required");
  }

  return await apiService.get(`/spaces/${currentSpace._id}/projects/${projectId}/members`);
});

export const updateProjectMemberRole = createAsyncThunk<
  any,
  {
    memberId: string,
    projectId: string,
    role: SpaceRole
  }
>("project/update-role", async ({ projectId, memberId, role }) => {
  const { currentSpace } = store.getState().space;
  if (!currentSpace) {
    throw Error("Current space is required");
  }

  return await apiService.put(`/spaces/${currentSpace._id}/projects/${projectId}/members/role`, { memberId, role });
});

export const updateProjectCover = createAsyncThunk<
  any,
  {
    projectId: string,
    file: any
  }
>("project/cover", async ({ projectId, file }) => {
  const { currentSpace } = store.getState().space;
  if (!currentSpace) {
    throw Error("Current space is required");
  }

  try {
    const avatar = new FormData();
    avatar.append("avatar", file);
    return await projectService.updateProjectCover(currentSpace._id, projectId, avatar)
  } catch (e: any) {
    throw Error(e.message);
  }
});

export const updateProject = createAsyncThunk<
  any,
  {
    projectId: string,
    name: string,
    description: string
  }
>("project/cover", async (payload) => {
  const { currentSpace } = store.getState().space;
  if (!currentSpace) {
    throw Error("Current space is required");
  }

  try {
    return await projectService.updateProject(currentSpace._id, payload.projectId, {name: payload.name, description: payload.description})
  } catch (e: any) {
    throw Error(e.message);
  }
});

export const removeProject = createAsyncThunk<
  any,
  string
>("project/remove", async (projectId) => {
  const { currentSpace } = store.getState().space;
  if (!currentSpace) {
    throw Error("Current space is required");
  }

  try {
    return await projectService.removeProject(currentSpace._id, projectId)
  } catch (e: any) {
    throw Error(e.message);
  }
});

export const getProjectLabels = createAsyncThunk<
  any,
  string
>('project/get-labels', async (projectId) => {
  const { currentSpace } = store.getState().space;
  if (!currentSpace) {
    throw Error("Current space is required");
  }
  try {
    return await projectService.getProjectLabels(currentSpace._id, projectId);
  } catch (e: any) {
    throw Error(e.message);
  }
})
