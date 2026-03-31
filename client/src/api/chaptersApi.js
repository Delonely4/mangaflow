import axiosInstance from "@/config/axios";

export const getChaptersByBookId = async (bookId) => {
  try {
    const response = await axiosInstance.get(`/chapters/book/${bookId}`);

    return {
      success: true,
      data: response.data,
      error: null,
    };
  } catch (err) {
    return {
      success: false,
      data: null,
      error:
        err.response?.data?.message || `Chapter for book ${bookId} not found`,
    };
  }
};

export const createChapter = async (chapterData) => {
  try {
    const response = await axiosInstance.post("/chapters", chapterData);

    return {
      success: true,
      data: response.data,
      error: null,
    };
  } catch (err) {
    return {
      success: false,
      data: null,
      error: err.response?.data?.message || "Failed to create chapter",
    };
  }
};

export const toggleChapterRead = async (bookId, number) => {
  try {
    const response = await axiosInstance.post(
      `/chapters/${bookId}/${number}/read`
    );
    return {
      success: true,
      data: response.data,
      error: null,
    };
  } catch (err) {
    return {
      success: false,
      data: null,
      error:
        err.response?.data?.message ||
        `Failed to toggle chapter ${bookId}/${number}`,
    };
  }
};

export const deleteChapter = async (id) => {
  try {
    const response = await axiosInstance.delete(`/chapters/${id}`);
    return {
      success: true,
      data: response.data,
      error: null,
    };
  } catch (err) {
    return {
      success: false,
      data: null,
      error: err.response?.data?.message || `Failed to delete chapter ${id}`,
    };
  }
};
