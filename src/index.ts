import express, { NextFunction, Request, Response } from "express";

import { ApiErrors } from "./errors/api.errors";
import { userRouter } from "./router/user.router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);

// app.delete(
//   "/users/:id",
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const hasNumber = /\d/.test(req.params.id);
//       if (hasNumber) {
//         const id = Number(req.params.id);
//         const users = await read();
//         const userIndex = users.findIndex((user) => user.id === id);
//         if (userIndex === -1) {
//           throw new ApiErrors("Not found user", 404);
//         }
//         users.splice(userIndex, 1);
//         await write(users);
//         return res.sendStatus(204);
//       }
//     } catch (e) {
//       next(e);
//     }
//   },
// );

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
