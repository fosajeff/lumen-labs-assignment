import {
    Column,
    Entity,
    ManyToOne,
  } from "typeorm";
  import { BaseModel } from "./BaseModel";
import { User } from "./User";
  
  @Entity()
  export class Follow extends BaseModel {
    
    @ManyToOne(() => User, user => user.following)
    follower: User;
  
    @ManyToOne(() => User, user => user.followers)
    followee: User;
  }
  