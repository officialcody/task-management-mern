import axios from "axios";
import { toast } from "react-toastify";
import { BACKEND_API_ENDPOINT_URL_DEV } from "../utils/app.constants";

const baseURL =
  process.env.REACT_APP_BACKEND_API_ENDPOINT_URL ||
  BACKEND_API_ENDPOINT_URL_DEV;

export const createTask = async (data) => {
  try {
    const response = await axios.post(`${baseURL}tasks`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    toast.success(response.data.message);
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const getAllTasks = async () => {
  try {
    const response = await axios.get(`${baseURL}tasks`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
