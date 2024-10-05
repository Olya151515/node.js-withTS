import { FilterQuery } from "mongoose";

import { IOldPasswords } from "../interfases/old-passwords";
import { oldPasswordsSchema } from "../models/old-password.model";

class OldPasswordsRepository {
  public async create(dto: IOldPasswords): Promise<IOldPasswords> {
    return await oldPasswordsSchema.create(dto);
  }
  public async findByParams(userId: string): Promise<IOldPasswords[]> {
    return await oldPasswordsSchema.find({ _userId: userId });
  }
  public async deleteManyByParams(
    params: FilterQuery<IOldPasswords>,
  ): Promise<number> {
    const { deletedCount } = await oldPasswordsSchema.deleteMany(params);
    return deletedCount;
  }
}
export const oldPasswordsRepository = new OldPasswordsRepository();
