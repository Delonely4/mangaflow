import dotenv from "dotenv";

dotenv.config();

const validateRequiredEnvVars = (requiredVars) => {
  const missing = requiredVars.filter((varName) => !process.env[varName]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}\n` +
        `Please check your .env file and ensure all required variables are set.`
    );
  }
};

const config = {
  env: process.env.NODE_ENV || "development",
  isDevelopment: process.env.NODE_ENV === "development",
  isProduction: process.env.NODE_ENV === "production",
  port: parseInt(process.env.PORT) || 3000,

  database: {
    url: process.env.DATABASE_URL,
    user: process.env.POSTGRES_USER || "postgres",
    password: process.env.POSTGRES_PASSWORD || "root",
    name: process.env.POSTGRES_DB || "mangaflow",
    host: "localhost",
    port: 5432,
  },

  jwt: {
    secret: process.env.JWT_SECRET || "mangaflow_secret_key_change_this",
    expiresIn: process.env.JWT_EXPIRE || "2d",
    cookieMaxAge: 2 * 24 * 60 * 60 * 1000,
  },

  security: {
    saltRounds: parseInt(process.env.SALT) || 10,
  },

  cors: {
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  },

  frontend: {
    url: process.env.FRONTEND_URL || "http://localhost:5173",
  },

  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  },

  rateLimit: {
    windowMs: 15 * 60 * 1000,
    maxRequests: 100,
  },

  upload: {
    maxAvatarSize: 5 * 1024 * 1024,
    maxImageSize: 10 * 1024 * 1024,
    allowedImageTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
  },

  logging: {
    level: process.env.LOG_LEVEL || "info",
    enableFileLogging: process.env.LOG_TO_FILE === "true",
  },
};

const requiredVars = ["DATABASE_URL", "JWT_SECRET"];

try {
  validateRequiredEnvVars(requiredVars);
  if (config.isDevelopment) {
    console.log("All required environment variables are set");
  }
} catch (error) {
  console.error("Configuration error:", error.message);
  if (config.isProduction) {
    process.exit(1);
  } else {
    console.warn("⚠️  Running in development mode with missing variables");
  }
}

export const getConfig = (path) => {
  return path.split(".").reduce((obj, key) => obj?.[key], config);
};

export const logConfig = () => {
  console.log("\n📋 MangaFlow Backend Configuration:");
  console.log(`   Environment: ${config.env}`);
  console.log(`   Port: ${config.port}`);
  console.log(
    `   Database: ${config.database.name}@${config.database.host}:${config.database.port}`
  );
  console.log(`   JWT Expiry: ${config.jwt.expiresIn}`);
  console.log(`   CORS Origin: ${config.cors.origin}`);
  console.log(`   Frontend URL: ${config.frontend.url}\n`);
};

if (config.isDevelopment) {
  logConfig();
}

export default config;
