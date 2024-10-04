import { CronJob } from "cron";

import { configs } from "../configs/configs";
import { timeHelper } from "../helper/time.helper";
import { tokenRepository } from "../repositories/token.repository";

const handler = async () => {
  const { value, unit } = timeHelper.parseConfigString(
    configs.JWT_REFRESH_EXPIRATION,
  );
  const date = timeHelper.subtractByParams(value, unit);
  const deletedCount = await tokenRepository.deleteBeforeDate(date);
  console.log("deleted count ", deletedCount);
  console.log("removeOldTokensCronJob is running");
};

export const removeOldTokensCronJob = new CronJob("* * * * * *", handler);
