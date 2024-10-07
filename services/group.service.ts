import apiService from "./api.service";
import axios from "axios";
import APIGateway from "@/constants/APIGateway";
import i18n from "@/translations";

export const fetchGroupCustomer = async (token: string) => {
  try {
    const response = await axios.post(`${APIGateway.gateway}/listGroupCustomerAPI`, {
        token: token
      });

    if (response.data) {
      return {
        code: response.data.code,
        data: response.data
      } 
    }
  } catch (error) {
    throw new Error(t(`error-group`));
  }
};