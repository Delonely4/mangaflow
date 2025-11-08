import dotenv from "dotenv";
import app from "./app.js";
import config from "./config/config.js";

dotenv.config();

app.listen(config.port, () => {
  console.log(`Example app listening on port ${config.port}`);
});
