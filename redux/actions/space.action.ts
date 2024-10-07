import { createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "@/services/api.service.ts";
import { RootState, store } from "@/redux/store.ts";
import { clearInvitations, setSpace } from "@/redux/slices/space.slice.ts";
import { clearTask } from "@/redux/slices/task.slice.ts";
import { Space } from "@/types/space.ts";

export const loadMembers = createAsyncThunk
("space/load-member", async () => {
  const currentSpace = store.getState().space.currentSpace;
  return await apiService.callApi("GET", `spaces/${currentSpace?._id}/members`);
});

export const loadInvitations = createAsyncThunk("space/load-invitations", async () => {
  const currentSpace = store.getState().space.currentSpace;
  return await apiService.callApi("GET", `spaces/${currentSpace?._id}/invitations`);
});

export const inviteByMails = createAsyncThunk<
  any,
  { spaceId: string, emails: string[] }
>("space/invite", async ({ spaceId, emails }) => {
  return await apiService.callApi("POST", `spaces/${spaceId}/invite`, { emails });
});

export const inviteByLink = createAsyncThunk<
  any,
  { spaceId: string, expiration: Date, slots: number }
>("space/invite-link", async ({ spaceId, expiration, slots }) => {
  return await apiService.callApi("POST", `spaces/${spaceId}/invite-link`, { expiration, slots });
});

export const getSpaces = createAsyncThunk("space/getSpaces", async () => {
  return await apiService.callApi("GET", "/spaces");
});


export const createSpace = createAsyncThunk<
  any,
  {
    name: string,
    type: string,
    slug: string
  }
>("space/create", async (payload) => {
  return await apiService.callApi("POST", `spaces`, payload);
});


export const switchSpace = createAsyncThunk<
  any,
  Space,
  { state: RootState }
>("space/switch", (space, thunkAPI) => {
  thunkAPI.dispatch(clearTask());
  thunkAPI.dispatch(setSpace(space));
  thunkAPI.dispatch(clearInvitations());
  return true;
});


export const uploadMemberAvatar = createAsyncThunk<
  any,
  any
>("space/member-avatar", async (file) => {
  const { currentSpace, spaceProfile } = store.getState().space;
  if (!currentSpace) {
    throw Error("Current space is required");
  }
  if (!spaceProfile) {
    throw Error("Space profile is required");
  }
  const avatar = new FormData();
  avatar.append("avatar", file);
  return await apiService.post(`/spaces/${currentSpace._id}/members/${spaceProfile._id}/picture`, avatar);
});

export const updateSpaceAvatar = createAsyncThunk<
  any,
  { spaceId: string, file: any },
  { state: RootState }
>("space/space-avatar", async ({ spaceId, file }, thunkAPI) => {
  const avatar = new FormData();
  avatar.append("avatar", file);
  const { data } = await apiService.put( `/spaces/${spaceId}/avatar`, avatar);
  thunkAPI.dispatch(getSpaces());
  return data
});
