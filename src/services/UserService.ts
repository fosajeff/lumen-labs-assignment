import bcrypt from "bcrypt";
import { Service } from "typedi";
import {
  updatePasswordDto,
  authDto,
  validateAuthDto,
  validateupdatePasswordDto,
} from "../dto/auth.dto";
import { User } from "../models/User";
import UserRepository from "../repository/UserRepository";
import { AppDataSource } from "../utils/data-source";
import HttpException from "../utils/exception";
import { __isProd__ } from "../utils/helpers";
import { IUserService } from "./IUserService";

@Service()
export class UserService implements IUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async signUp(data: authDto): Promise<User | void> {
    const { error } = validateAuthDto(data);

    if (error) {
      throw new HttpException(400, error.message);
    }
    let user = await this.userRepository.findByUsername(data.username);
    if (user) {
      throw new HttpException(403, "User with username already exist");
    }

    data.password = await bcrypt.hash(data.password, 10);
    user =  await this.userRepository.save(data);
    delete user.password;
    return user;
  }

  async login(data: authDto): Promise<User> {
    const { error } = validateAuthDto(data);

    if (error) {
      throw new HttpException(400, error.message);
    }

    const user = await AppDataSource.getRepository(User)
      .createQueryBuilder("user")
      .addSelect("user.password")
      .where("user.username = :username", { username: data.username })
      .getOne();

    if (!user) {
      throw new HttpException(404, "Incorrect email or password");
    }

    if (user) {
      let isMatch = await bcrypt.compare(data.password, user.password);
      if (isMatch) {
        delete user.password;
        return user;
      }
    }
    throw new HttpException(404, "Incorrect email or password");
  }

  async updatePassword(id: number, data: updatePasswordDto): Promise<User> {
    const { error } = validateupdatePasswordDto(data);

    if (error) {
      throw new HttpException(400, error.message);
    }

    const user = await await AppDataSource.getRepository(User)
    .createQueryBuilder("user")
    .addSelect("user.password")
    .where("user.id = :id", { id })
    .getOne();


    if (!user) {
      throw new HttpException(404, "User record not found");
    }

    let isMatch = await bcrypt.compare(data.old_password, user.password);
    if (!isMatch) {
      throw new HttpException(401, "Incorrect password");
    }

    data.new_password = await bcrypt.hash(data.new_password, 10);

    const updatedUser = { ...user, password: data.new_password };

    await this.userRepository.update(user.id, updatedUser);

    delete updatedUser.password;

    return updatedUser;
  }
  async find(): Promise<User[]> {
    return this.userRepository.find();
  }
  async findById(id: number): Promise<User | null> {
    const user = await this.userRepository.findById(id);
    delete user.password;
    return user;
  }
  async getCurrentLoggedInUser(id: number): Promise<User> {
    return this.userRepository.findById(id);
  }
  async followUser(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async unFollowUser(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
