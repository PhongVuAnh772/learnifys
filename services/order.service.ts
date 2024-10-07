import axios from "axios";
import APIGateway from "@/constants/APIGateway";
import i18n from "@/translations";

export const getDataOrderList = async (token: string, limit: number, page = 1) => {
  try {
    const response = await axios.post(`${APIGateway.gateway}/getListOrdersAPI`, {
        token,
        limit,
        page
      });
    console.log(response.data);
    return response.data
  } catch (error) {
    throw new Error(t(`error-login`));
  }
};

export const getDataOrderMember = async (token: string, limit: number, page = 1) => {
  try {
    const response = await axios.post(`${APIGateway.gateway}/getListOrderMemberAPI`, {
        token,
        limit,
        page
      });
    console.log(response.data);
    return response.data
  } catch (error) {
    throw new Error(t(`error-login`));
  }
};