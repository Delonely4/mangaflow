import axiosInstance from "@/config/axios";

export const getAllBooks = async () => {
  try {
    const response = await axiosInstance.get("/books");
    return {
      success: true,
      data: response.data.data,
      error: null,
    };
  } catch (err) {
    return {
      success: false,
      data: null,
      error: err.response?.data?.message || "Failed to fetch books",
    };
  }
};

export const getBookById = async (id) => {
  try {
    const response = await axiosInstance.get(`/books/${id}`);
    return {
      success: true,
      data: response.data.data,
      error: null,
    };
  } catch (err) {
    return {
      success: false,
      data: null,
      error: err.response?.data?.message || `Book with ID ${id} not found`,
    };
  }
};

export const createBook = async (bookData) => {
  try {
    const response = await axiosInstance.post("/books", bookData);
    return {
      success: true,
      data: response.data.data,
      error: null,
    };
  } catch (err) {
    return {
      success: false,
      data: null,
      error: err.response?.data?.message || "Failed to create book",
    };
  }
};

export const updateBook = async (id, bookData) => {
  try {
    const response = await axiosInstance.put(`/books/${id}`, bookData);
    return {
      success: true,
      data: response.data.data,
      error: null,
    };
  } catch (err) {
    return {
      success: false,
      data: null,
      error: err.response?.data?.message || `Failed to update book ${id}`,
    };
  }
};

export const deleteBook = async (id) => {
  try {
    const response = await axiosInstance.delete(`/books/${id}`);
    return {
      success: true,
      data: response.data,
      error: null,
    };
  } catch (err) {
    return {
      success: false,
      data: null,
      error: err.response?.data?.message || `Failed to delete book ${id}`,
    };
  }
};
