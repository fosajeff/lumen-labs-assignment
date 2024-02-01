import { Service } from "typedi";
import { Follow } from "../models/Follow";
import { AppDataSource } from "../utils/data-source";
import { IBaseRepository } from "./IBaseRepository";

@Service()
export default class FollowRepository {
  private followRepository = AppDataSource.getRepository(Follow);

  async save(item: Follow): Promise<Follow> {
    return this.followRepository.save(item);
  }
  async delete(item: Follow) {
    return this.followRepository.delete(item);
  }
  async find(): Promise<Follow[]> {
    return this.followRepository.find();
  }
  async findOne(
    followerId: number,
    followeeId: number
  ): Promise<Follow | null> {
    return this.followRepository.findOne({
      where: { follower: { id: followerId }, followee: { id: followeeId } },
    });
  }
}
