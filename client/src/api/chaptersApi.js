import axiosInstance from "@/config/axios";

export const getChaptersByBookId = async (bookId) => {
  const response = await axiosInstance.get(`/chapters/book/${bookId}`);

  return response.data;
};

export const createChapter = async (chapterData) => {
  const response = await axiosInstance.post("/chapters", chapterData);

  return response.data;
};

export const toggleChapterRead = async (bookId, number) => {
  const response = await axiosInstance.post(
    `/api/chapters/${bookId}/${number}/read`
  );

  return response.data;
};

export const deleteChapter = async (id) => {
  const response = await axiosInstance.delete(`/chapters/${id}`);

  return response.data;
};
