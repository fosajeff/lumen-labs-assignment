import {
  Column,
  Entity,
  Generated,
} from "typeorm";
import { BaseModel } from "./BaseModel";

@Entity("users")
export class User extends BaseModel {
  @Generated("uuid")
  @Column()
  user_id?: string;

  @Column({ nullable: true })
  full_name?: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false, select: false })
  password: string;

  @Column({ nullable: true })
  phone_number?: string;

  @Column({ nullable: true })
  otp?: string;

  @Column({ nullable: true })
  token?: string;

  @Column({ nullable: true, default: false })
  is_deactivated?: boolean;
}
