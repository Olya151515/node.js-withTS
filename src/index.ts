import express, { NextFunction, Request, Response } from "express";
import * as mongoose from "mongoose";

import { configs } from "./configs/configs";
import { ApiErrors } from "./errors/api.errors";
import { userRouter } from "./router/user.router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use("", (req: Request, res: Response, next: NextFunction) => {
//   console.log(`${req.method} , ${req.path}`);
//   next();
// });

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
  console.log(`Server is running ${configs.APP_Port}`);
});
