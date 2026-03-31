import dotenv from "dotenv";
import app from "./app.js";
import config from "./config/config.js";
import logger from "./utils/logger.js";

dotenv.config();

app.listen(config.port, () => {
  logger.info(`Example app listening on port ${config.port}`);
});
