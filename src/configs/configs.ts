import dotenv from "dotenv";

dotenv.config();

export const configs = {
  APP_Port: process.env.PORT || 5000,
  APP_Host: process.env.APP_Host,
  APP_FRONT_URL: process.env.APP_FRONT_URL,

  Mongoose_url: process.env.MONGOOSE_URL,

  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_ACCESS_EXPIRATION: process.env.JWT_ACCESS_EXPIRATION,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  JWT_REFRESH_EXPIRATION: process.env.JWT_REFRESH_EXPIRATION,

  ACTION_FORGOT_PASSWORD_SECRET: process.env.ACTION_FORGOT_PASSWORD_SECRET,
  ACTION_FORGOT_PASSWORD_EXPIRATION:
    process.env.ACTION_FORGOT_PASSWORD_EXPIRATION,

  SMTP_EMAIL: process.env.SMTP_EMAIL,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
};
