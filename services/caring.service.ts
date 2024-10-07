import axios from "axios";
import APIGateway from "@/constants/APIGateway";
import i18n from "@/translations";

export type ActionCaringType =
  | "call"
  | "message"
  | "go_meet"
  | "online_meeting"
  | "other"
  | null;

export const getCaring = async (token: string, limit: number, id_customer: number,page = 1) => {
  try {
    const response = await axios.post(
      `${APIGateway.gateway}/getListCustomerHistoriesAPI`,
      {
        token,
        limit,
        page,
        id_customer
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(i18n.t(`error-login`));
  }
};

export const handleCaring = async (
  token: string,
  id_customer: number,
  note = "",
  action: ActionCaringType,
  time: string
) => {
  try {
    const response = await axios.post(
      `${APIGateway.gateway}/saveCustomerHistoryAPI`,
      {
        token,
        id_customer,
        note,
        action,
        time,
      }
    );
    console.log(token, id_customer, note, action,time);
    return response.data;
  } catch (error) {
    throw new Error(i18n.t(`error-server`));
  }
};
