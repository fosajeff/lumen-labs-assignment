import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  type: "postgres",
  synchronize: false,
  logging: false,
  entities: ["src/models/*{.ts,.js}"],
  migrations: ["src/migrations/*{.ts,.js}"],
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});
