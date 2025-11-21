import axios from "axios";

const API_BASE = "https://farhan-agency.onrender.com/api/orders";

export const createOrder = (orderData) => {
  return axios.post(`${API_BASE}/create`, orderData, { withCredentials: true });
};