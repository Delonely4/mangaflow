// Middleware для обработки ошибок
export const errorHandler = (error, req, res, next) => {
  console.error("Ошибка:", error);

  // Ошибки Prisma
  if (error.code === "P2002") {
    return res.status(409).json({
      error: "Запись с такими данными уже существует",
    });
  }

  if (error.code === "P2025") {
    return res.status(404).json({
      error: "Запись не найдена",
    });
  }

  // Ошибки валидации
  if (error.name === "ValidationError") {
    return res.status(400).json({
      error: "Ошибка валидации данных",
    });
  }

  // Общие ошибки сервера
  res.status(500).json({
    error: "Внутренняя ошибка сервера",
    message: process.env.NODE_ENV === "development" ? error.message : undefined,
  });
};

// Middleware для обработки 404 ошибок
export const notFoundHandler = (req, res) => {
  res.status(404).json({
    error: "Маршрут не найден",
    path: req.path,
  });
};
