import axiosInstance from "../config/axios";

export const updateProfile = async (userData) => {
  try {
    const response = await axiosInstance.put("/users/profile", userData, {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    const message = err.response?.data?.message || "Failed to update profile";
    throw new Error(message);
  }
};

export const uploadAvatar = async (file) => {
  const formData = new FormData();
  formData.append("avatar", file);

  try {
    const response = await axiosInstance.post("/users/avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
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
      error: err.response?.data?.message || "Failed to upload avatar",
    };
  }
};
