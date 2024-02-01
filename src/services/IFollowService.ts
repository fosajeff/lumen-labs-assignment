import { DeleteResult } from "typeorm";
import { Follow } from "../models/Follow";
import { User } from "../models/User";

export interface IFollowService {
  follow(followerId: number, followeeId: number): Promise<Follow>;
  unfollow(followerId: number, followeeId: number): Promise<DeleteResult>;
  mostFollowed(): Promise<User[]>;
}