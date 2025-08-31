// Константы приложения
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

export const ERROR_MESSAGES = {
  MANGA_NOT_FOUND: "Манга не найдена",
  INVALID_DATA: "Неверные данные",
  SERVER_ERROR: "Внутренняя ошибка сервера",
  VALIDATION_ERROR: "Ошибка валидации",
};

export const SUCCESS_MESSAGES = {
  MANGA_CREATED: "Манга успешно создана",
  MANGA_UPDATED: "Манга успешно обновлена",
  MANGA_DELETED: "Манга успешно удалена",
};
