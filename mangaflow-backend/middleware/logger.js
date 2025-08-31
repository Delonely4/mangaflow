// Middleware для логирования запросов
export const requestLogger = (req, res, next) => {
  const start = Date.now();

  // Логируем входящий запрос
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);

  // Перехватываем ответ для логирования
  const originalSend = res.send;
  res.send = function (data) {
    const duration = Date.now() - start;
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.path} - ${
        res.statusCode
      } (${duration}ms)`
    );
    originalSend.call(this, data);
  };

  next();
};

// Middleware для логирования ошибок
export const errorLogger = (error, req, res, next) => {
  console.error(
    `[${new Date().toISOString()}] Ошибка в ${req.method} ${req.path}:`,
    error
  );
  next(error);
};
