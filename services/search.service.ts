import axios from "axios";
import APIGateway from "@/constants/APIGateway";
import { tokenSystem } from "@/constants/tokenSystem";

export const fetchSearchingCampaign = async (
  token: string,
  searchValue: string
) => {
  try {
    const response = await axios.post(`${APIGateway.gateway}/searchMemberAPI`, {
      token: token,
      phone: searchValue,
    });
    if (response.data) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error fetching tokens:", error);
    return false;
  }
};
