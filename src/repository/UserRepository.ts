import { Service } from "typedi";
import { User } from "../models/User";
import { AppDataSource } from "../utils/data-source";
import { IBaseRepository } from "./IBaseRepository";

@Service()
export default class UserRepository implements IBaseRepository<User> {
  private userRepository = AppDataSource.getRepository(User);

  async save(item: User): Promise<User> {
    return this.userRepository.save(item);
  }
  async update(id: number, item: any): Promise<User | null> {
    this.userRepository.update({ id }, item);
    return await this.findById(id);
  }
  async delete(id: number) {
    this.userRepository.delete({ id });
  }
  async find(): Promise<User[]> {
    return this.userRepository.find({
      relations: ['followers'],
    });
  }
  async findById(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id },
      select: ['id', 'username', 'created_at', 'updated_at', 'is_active', 'is_deleted'],
      relations: ['following', 'followers']
    });
  }
  async findByUsername(username: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ username });
  }
}
