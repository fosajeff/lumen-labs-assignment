import { Column, PrimaryGeneratedColumn } from "typeorm";

export abstract class BaseModel {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ default: 1, nullable: true })
  created_by?: number;

  @Column({ default: 0 })
  updated_by?: number;

  @Column({ default: new Date() })
  created_at?: Date;

  @Column({ default: new Date() })
  updated_at?: Date;

  @Column({ default: false })
  is_deleted?: boolean;

  @Column({ nullable: true, default: true })
  is_active?: boolean;
}
