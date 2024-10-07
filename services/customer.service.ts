import axios from "axios";
import APIGateway from "@/constants/APIGateway";
import i18n from "@/translations";

export const getCustomer = async (token: string, limit: number, page = 1) => {
  try {
    const response = await axios.post(`${APIGateway.gateway}/getListCustomerAPI`, {
        token,
        limit,
        page
      });
    console.log(response.data);
    return response.data
  } catch (error) {
    throw new Error(i18n.t(`error-login`));
  }
};