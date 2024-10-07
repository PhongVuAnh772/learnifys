import apiService from "./api.service";
import axios from "axios";
import APIGateway from "@/constants/APIGateway";
import i18n from "@/translations";
class AuthService {
  async getProfile(accessToken: string) {
    return await apiService.post(`/checkLoginMemberAPI`, {
      token: accessToken
    });
  }

  async login(username: string, password: string) {
    return await apiService.post('/getInfoMemberAPI', {
      username,
      password
    });
  }

  async register(username: string, password: string, email: string) {
    return await apiService.post('/registerAPI', {
      username,
      password,
      email
    });
  }
}

export const fetchTokens = async () => {
  try {
    const response = await axios.posi18n.t("https://example.com/api/auth/tokens", {
      username: "your-username",
      password: "your-password",
    });

    if (response.status === 200) {
      return response.data; 
    } else {
      throw new Error("Failed to fetch tokens");
    }
  } catch (error) {
    console.error("Error fetching tokens:", error);
    throw error;
  }
};

// Hàm fetchProfile gọi API để lấy profile của người dùng bằng accessToken
export const fetchProfile = async (accessToken: string) => {
  try {
    const response = await axios.post(`${APIGateway.gateway}/getInfoMemberAPI`, {
        token: accessToken as any
      });
    return {
        code: response.data.code,
        data: response.data
      }
  } catch (error) {
    throw new Error(i18n.t(`error-login`));
  }
};

export const fetchLogin = async (username: string, password: string,token_device: string) => {
  try {
    const response = await axios.post(`${APIGateway.gateway}/checkLoginMemberAPI`, {
        phone: username,
        password: password,
        token_device: token_device
      });

    if (response.data) {
      return {
        code: response.data.code,
        data: response.data
      } 
    }
  } catch (error) {
    throw new Error(i18n.t(`error-login`));
  }
};

export default new AuthService();
