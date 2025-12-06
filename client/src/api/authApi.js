import axiosInstance from "@/config/axios";

export const loginUser = async (email, password) => {
  const response = await axiosInstance.post("/auth/login", {
    email,
    password,
  });

  return response.data;
};

export const registerUser = async (username, email, password) => {
  const response = await axiosInstance.post("/auth/register", {
    username,
    email,
    password,
  });

  return response.data;
};

export const logOut = async () => {
  const response = await axiosInstance.post("/auth/logout");

  return response.data;
};

export const getMe = async () => {
  const response = await axiosInstance.get("/auth/me");

  return response.data;
};
