import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import * as mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";

import swaggerDocument from "../docs/swagger.json";
import { configs } from "./configs/configs";
import { cronRunner } from "./crons";
import { ApiErrors } from "./errors/api.errors";
import { authRouter } from "./router/auth.router";
import { userRouter } from "./router/user.router";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: [
      "Authorization",
      "Content-Type",
      "Origin",
      "Access-Control-Allow-Origin",
    ],
    preflightContinue: false,
    optionsSuccessStatus: 200,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// app.use("", (req: Request, res: Response, next: NextFunction) => {
//   console.log(`${req.method} , ${req.path}`);
//   next();
// });

app.use("/auth", authRouter);
app.use("/users", userRouter);

app.use(
  "*",
  (err: ApiErrors, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500).send(err.message);
  },
);

process.on("uncaughtException", (error) => {
  console.error("uncaughtException", error.message, error.stack);
});
app.listen(configs.APP_Port, async () => {
  await mongoose.connect(configs.Mongoose_url);
  cronRunner(); //cron
  console.log(`Server is running ${configs.APP_Port}`);
});
