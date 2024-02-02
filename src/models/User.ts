import {
  Column,
  Entity,
  OneToMany,
} from "typeorm";
import { BaseModel } from "./BaseModel";
import { Follow } from "./Follow";

@Entity()
export class User extends BaseModel {
  
  @Column({ nullable: false, unique: true })
  username: string;

  @Column({ nullable: false, select: false })
  password: string;

  @Column({ nullable: false, select: false, default: 0 })
  no_of_followers: number;

  @OneToMany(() => Follow, follow => follow.follower, { cascade: true })
  following: Follow[];

  @OneToMany(() => Follow, follow => follow.followee, { cascade: true })
  followers: Follow[];

  
}
