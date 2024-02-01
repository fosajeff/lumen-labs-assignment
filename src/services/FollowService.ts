import { Service } from "typedi";
import { User } from "../models/User";
import FollowRepository from "../repository/followRepository";
import { IFollowService } from "./IFollowService";
import { Follow } from "../models/Follow";
import { DeleteResult } from "typeorm";
import UserRepository from "../repository/UserRepository";

@Service()
export class FollowService implements IFollowService {
  constructor(
    private followRepository: FollowRepository,
    private userRepository: UserRepository
  ) {}

  async follow(followerId: number, followeeId: number): Promise<Follow> {
    const follow = await this.followRepository.findOne(followerId, followeeId);

    if (!follow) {
      return await this.followRepository.save({
        follower: { id: followerId } as User,
        followee: { id: followeeId } as User,
      });
    }
  }
  async unfollow(
    followerId: number,
    followeeId: number
  ): Promise<DeleteResult> {
    const follow = await this.followRepository.findOne(followerId, followeeId);

    if (follow) {
      return await this.followRepository.delete({
        follower: { id: followerId } as User,
        followee: { id: followeeId } as User,
      });
    }
  }
  async mostFollowed(): Promise<User[]> {
    const users = await this.userRepository.find();
    const result = users.map((user) => {
      user.no_of_followers = user.followers.length;
      return user;
    });
    result.sort((a, b) => b.no_of_followers - a.no_of_followers);
    return users;
  }
}
