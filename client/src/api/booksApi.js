import axiosInstance from "@/config/axios";

export const getAllBooks = async () => {
  const response = await axiosInstance.get("/books");

  return response.data;
};

export const getBookById = async (id) => {
  const response = await axiosInstance.get(`/books/${id}`);
  return response.data;
};

export const createBook = async (bookData) => {
  const response = await axiosInstance.post("/books", bookData);
  return response.data;
};

export const updateBook = async (id, bookData) => {
  const response = await axiosInstance.put(`/books/${id}`, bookData);
  return response.data;
};

export const deleteBook = async (id) => {
  const response = await axiosInstance.delete(`/books/${id}`);
  return response.data;
};
