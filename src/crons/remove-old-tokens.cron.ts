import { CronJob } from "cron";

import { configs } from "../configs/configs";
import { timeHelper } from "../helper/time.helper";
import { tokenRepository } from "../repositories/token.repository";

const handler = async () => {
  try {
    const { value, unit } = timeHelper.parseConfigString(
      configs.JWT_REFRESH_EXPIRATION,
    );
    const date = timeHelper.subtractByParams(value, unit);
    await tokenRepository.deleteBeforeDate(date);
    //console.log("deleted count ", deletedCount);
  } catch (error) {
    console.log(error);
  }
};
export const removeOldTokensCronJob = new CronJob("* * * * 9 *", handler);
