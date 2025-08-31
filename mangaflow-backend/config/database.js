// Конфигурация базы данных
export const dbConfig = {
  url: process.env.DATABASE_URL,
  options: {
    log: ["query", "info", "warn", "error"],
  },
};

// Проверка подключения к БД
export const checkDatabaseConnection = async (prisma) => {
  try {
    await prisma.$connect();
    console.log("Подключение к базе данных установлено");
  } catch (error) {
    console.error("Ошибка подключения к базе данных:", error);
    process.exit(1);
  }
};
