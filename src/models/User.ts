import {
  Column,
  Entity,
} from "typeorm";
import { BaseModel } from "./BaseModel";

@Entity("users")
export class User extends BaseModel {
  
  @Column({ nullable: false, unique: true })
  username: string;

  @Column({ nullable: false, select: false })
  password: string;
}
