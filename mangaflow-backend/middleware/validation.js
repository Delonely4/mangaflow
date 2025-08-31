// Middleware для валидации данных
export const validateManga = (req, res, next) => {
  const {
    name,
    name_eng,
    description,
    status,
    total_chapters,
    publication_year,
  } = req.body;

  // Проверяем обязательные поля
  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return res.status(400).json({
      error: "Название манги обязательно и должно быть строкой",
    });
  }

  // Проверяем статус, если передан
  if (
    status &&
    !["ONGOING", "COMPLETED", "HIATUS", "CANCELLED", "ANNOUNCED"].includes(
      status
    )
  ) {
    return res.status(400).json({
      error: "Неверный статус манги",
    });
  }

  // Проверяем числовые поля
  if (total_chapters && (isNaN(total_chapters) || total_chapters < 0)) {
    return res.status(400).json({
      error: "Количество глав должно быть положительным числом",
    });
  }

  if (
    publication_year &&
    (isNaN(publication_year) ||
      publication_year < 1900 ||
      publication_year > new Date().getFullYear())
  ) {
    return res.status(400).json({
      error: "Год публикации должен быть между 1900 и текущим годом",
    });
  }

  // Очищаем данные от лишних пробелов
  req.body.name = name.trim();
  if (name_eng) req.body.name_eng = name_eng.trim();
  if (description) req.body.description = description.trim();

  next();
};

export const validateId = (req, res, next) => {
  const { id } = req.params;

  if (!id || typeof id !== "string") {
    return res.status(400).json({
      error: "ID должен быть строкой",
    });
  }

  next();
};
