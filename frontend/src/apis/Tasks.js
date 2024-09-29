import axios from "axios";
import { toast } from "react-toastify";
import { BACKEND_API_ENDPOINT_URL_DEV } from "../utils/app.constants";

const baseURL =
  process.env.REACT_APP_BACKEND_API_ENDPOINT_URL ||
  BACKEND_API_ENDPOINT_URL_DEV;

const token = `Bearer ${localStorage.getItem("token")}`;

export const createTask = async (data) => {
  try {
    const response = await axios.post(`${baseURL}tasks`, data, {
      headers: {
        Authorization: token,
      },
    });
    toast.success(response.data.message);
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
