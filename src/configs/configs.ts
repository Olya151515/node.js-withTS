import dotenv from "dotenv";

dotenv.config();

export const configs = {
  APP_Port: process.env.PORT || 5000,
  APP_Host: process.env.APP_Host,
  Mongoose_url: process.env.MONGOOSE_URL,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_ACCESS_EXPIRATION: process.env.JWT_ACCESS_EXPIRATION,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  JWT_REFRESH_EXPIRATION: process.env.JWT_REFRESH_EXPIRATION,
};
