import { ApiErrors } from "../errors/api.errors";
import { IUser } from "../interfases/IUser";
import { userRepository } from "../repositories/user.repository";
import { passwordService } from "./password.service";

class AuthService {
  public signUp = async (dto: Partial<IUser>): Promise<IUser> => {
    await this.isEmailExist(dto.email);
    const password = await passwordService.hashPassword(dto.password);
    return await userRepository.createUser({ ...dto, password });
  };
  //public signIn = async (dto: any): Promise<any> => {};
  public isEmailExist = async (email: string): Promise<void> => {
    const user = await userRepository.getUserByEmail(email);
    if (user) {
      throw new ApiErrors("Email exist", 409);
    }
  };
}

export const authService = new AuthService();
