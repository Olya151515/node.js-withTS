import express, { NextFunction, Request, Response } from "express";

import { ApiErrors } from "./errors/api.errors";
import { userRouter } from "./router/user.router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
app.listen(5100, () => {
  console.log("Server is running ");
});
