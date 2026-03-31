import JWT from "jsonwebtoken";
import config from "../config/config.js";

export const generateToken = (userId) => {
  return JWT.sign({ userId }, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  });
};

export const verifyToken = (token) => {
  return JWT.verify(token, config.jwt.secret);
};
