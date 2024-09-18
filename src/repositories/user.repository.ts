import { ApiErrors } from "../errors/api.errors";
import { IUser } from "../interfases/IUser";
import { read, write } from "../services/fs.service";

class UserRepository {
  public getList = async (): Promise<IUser[]> => {
    return await read();
  };
  public createUser = async (dto: Partial<IUser>): Promise<IUser> => {
    const users = await read();
    const newUser = {
      id: users[users.length - 1].id + 1,
      name: dto.name,
      email: dto.email,
      password: dto.password,
    };
    users.push(newUser);
    await write(users);
    return newUser;
  };
  public getUserById = async (userId: number): Promise<IUser | null> => {
    const users = await read();
    return users.find((user) => user.id === userId);
  };
  public updateUserById = async (
    userId: number,
    userBody: Partial<IUser>,
  ): Promise<IUser[]> => {
    const users = await read();
    const userIndex = users.findIndex((user) => user.id === userId);
    const { name, email, password } = userBody;
    users[userIndex].name = name;
    users[userIndex].email = email;
    users[userIndex].password = password;

    await write(users);
    return users;
  };
  public deleteUserById = async (userId: number): Promise<IUser[]> => {
    const users = await read();
    const userIndex = users.findIndex((user) => user.id === userId);
    if (userIndex === -1) {
      throw new ApiErrors("Not found user", 404);
    }
    users.splice(userIndex, 1);
    await write(users);
    return users;
  };
}

export const userRepository = new UserRepository();
