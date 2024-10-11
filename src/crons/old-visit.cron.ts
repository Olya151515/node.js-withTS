import { CronJob } from "cron";

import { EmailTypeEnum } from "../enums/email-type.enum";
import { timeHelper } from "../helper/time.helper";
import { userRepository } from "../repositories/user.repository";
import { emailService } from "../services/email.service";

const handler = async () => {
  try {
    const date = timeHelper.subtractByParams(7, "days");
    const users = await userRepository.findWithOutActivity(date);
    await Promise.all([
      users.map(async (user) => {
        await emailService.sendEmail(user.email, EmailTypeEnum.OLD_VISIT, {
          name: user.name,
        });
      }),
    ]);
    //console.log("count", users.length);
  } catch (error) {
    console.log(error);
  }
};
export const oldVisitCronJob = new CronJob("* * * * 9 *", handler);
