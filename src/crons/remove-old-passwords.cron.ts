import { CronJob } from "cron";

import { timeHelper } from "../helper/time.helper";
import { oldPasswordsRepository } from "../repositories/old-passwords.repository";

const handler = async () => {
  try {
    const date = timeHelper.subtractByParams(90, "days");
    const deletedCount = await oldPasswordsRepository.deleteManyByParams({
      createdAt: { $lt: date },
    });
    console.log("deleted count ", deletedCount);
  } catch (error) {
    console.log(error);
  }
};
export const removeOldPasswordsCronJob = new CronJob(
  "0,20,30 * * * * *",
  handler,
);
