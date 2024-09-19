import dotenv from "dotenv";

dotenv.config();

export const configs = {
  APP_Port: process.env.PORT || 5000,
  APP_Host: process.env.APP_Host,
  Mongoose_url: process.env.MONGOOSE_URL,
};
