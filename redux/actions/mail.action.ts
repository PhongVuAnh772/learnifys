import {createAsyncThunk} from "@reduxjs/toolkit";
import {RootState, store} from "@/redux/store.ts";
import MailService from "@/services/mail.service.ts";
import {MailState} from "@/redux/slices/mail.slice.ts";
import {MailLabel} from "@/types/navigation.ts";
import {EmailAddress} from "@/types/mail.ts";

export const loadMails = createAsyncThunk<MailState, { reload: boolean, label: MailLabel }, {
  state: RootState
}>('mail/load-mails', async ({reload, label}, thunkAPI) => {
  const currentSpace = store.getState().space.currentSpace;
  const {activeEmail, mails} = store.getState().mail;
  const pagination = mails[label].pagination;

  if (!currentSpace) {
    throw Error("Current space is required");
  }
  if (!activeEmail) {
    throw Error("Active email is required");
  }
  if (!reload && !pagination.hasNext) {
    throw Error("No more data");
  }

  const currentEmail = activeEmail.alias + "@" + activeEmail.domainString;
  return await MailService.getEmails(currentSpace._id, currentEmail, label, 12, reload ? 1 : pagination.page + 1);
});

export const loadEmailAddress = createAsyncThunk<EmailAddress[], void, {
  state: RootState
}>('mail/load-emailAddress', async () => {
  const currentSpace = store.getState().space.currentSpace;
  if (!currentSpace) {
    throw Error("Current space is required");
  }
  return await MailService.getEmailAddress(currentSpace._id);
});
