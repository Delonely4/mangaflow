import axios from "axios";

// Создаем экземпляр axios с базовой конфигурацией
export const api = axios.create({
  baseURL: "/api", // Используем прокси из vite.config.js
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Интерцептор для обработки ошибок
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);

    // Обработка различных типов ошибок
    if (error.response) {
      // Сервер ответил с ошибкой
      const { status, data } = error.response;

      switch (status) {
        case 400:
          console.error("Ошибка валидации:", data.error);
          break;
        case 401:
          console.error("Не авторизован");
          break;
        case 403:
          console.error("Доступ запрещен");
          break;
        case 404:
          console.error("Ресурс не найден");
          break;
        case 500:
          console.error("Внутренняя ошибка сервера");
          break;
        default:
          console.error(`Ошибка ${status}:`, data.error);
      }
    } else if (error.request) {
      // Запрос был отправлен, но ответ не получен
      console.error("Нет ответа от сервера");
    } else {
      // Ошибка при настройке запроса
      console.error("Ошибка настройки запроса:", error.message);
    }

    return Promise.reject(error);
  }
);

// Функции для работы с мангой
export const mangaApi = {
  // Получить список всех манг
  getAll: () => api.get("/manga"),

  // Получить мангу по ID
  getById: (id) => api.get(`/manga/${id}`),

  // Создать новую мангу
  create: (data) => api.post("/manga", data),

  // Обновить мангу
  update: (id, data) => api.put(`/manga/${id}`, data),

  // Удалить мангу
  delete: (id) => api.delete(`/manga/${id}`),
};

