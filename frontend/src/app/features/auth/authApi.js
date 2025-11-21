import axios from "axios";

const API_BASE = "https://farhan-agency.onrender.com/api/auth";

const instance = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

export const getProfile = () => instance.get("/profile");

export const login = (credentials) => instance.post("/login", credentials);

export const register = (formData) =>
  instance.post("/register", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const logout = () => instance.post("/logout");
