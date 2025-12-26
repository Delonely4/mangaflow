import axiosInstance from "@/config/axios";
import { data } from "react-router-dom";

export const loginUser = async (email, password) => {
  try {
    const response = await axiosInstance.post("/users/login", {
      email,
      password,
    });

    return {
      success: true,
      data: response.data,
      error: null,
    };
  } catch (err) {
    return {
      success: false,
      data: null,
      error: err.response?.data?.message || "Unable to connect to the server",
    };
  }
};

export const registerUser = async (username, email, password) => {
  try {
    const response = await axiosInstance.post("/users/register", {
      username,
      email,
      password,
    });

    return {
      success: true,
      data: response.data,
      error: null,
    };
  } catch (err) {
    return {
      success: false,
      data: null,
      error: err.response?.data?.message || "Registration failed",
    };
  }
};

export const logOut = async () => {
  const response = await axiosInstance.post("/users/logout");

  return response.data;
};

export const getMe = async () => {
  const response = await axiosInstance.get("/users/me");

  return response.data;
};
