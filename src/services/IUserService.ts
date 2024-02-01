import { DeleteDateColumn } from "typeorm";
import {
  authDto, updatePasswordDto,
} from "../dto/auth.dto";
import { User } from "../models/User";

export interface IUserService {
  signUp(data: authDto): Promise<User | void>;
  login(data: authDto): Promise<User>;
  updatePassword(id: number, data: updatePasswordDto): Promise<User | null>;
  find(): Promise<User[]>;
  findById(id: number): Promise<User | null>;
  getCurrentLoggedInUser(id: number): Promise<User | null>;
  followUser(id: number): Promise<void>;
  unFollowUser(id: number): Promise<void>;
}
