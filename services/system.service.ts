import axios from 'axios';
import APIGateway from '@/constants/APIGateway';
import { tokenSystem } from '@/constants/tokenSystem';

export const fetchSystem = async () => {
  try {
    const response = await axios.post(`${APIGateway.system}`, {
      token: tokenSystem
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
