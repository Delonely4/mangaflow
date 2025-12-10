import axiosInstance from "@/config/axios";

export const loginUser = async (email, password) => {
  try {
    const response = await axiosInstance.post("/auth/login", {
      email,
      password,
    });

    return response.data;
  } catch (err) {
    const message =
      err.response?.data?.message || "Unable to connect to the server";

    throw new Error(message);
  }
};

export const registerUser = async (username, email, password) => {
  try {
    const response = await axiosInstance.post("/auth/register", {
      username,
      email,
      password,
    });

    return response.data;
  } catch (err) {
    const message = err.response?.data?.message || "Registration failed";

    throw new Error(message);
  }
};

export const logOut = async () => {
  const response = await axiosInstance.post("/auth/logout");

  return response.data;
};

export const getMe = async () => {
  const response = await axiosInstance.get("/auth/me");

  return response.data;
};
