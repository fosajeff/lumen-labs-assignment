import { __isProd__ } from "./utils/helpers";
__isProd__ && require("dotenv").config()

import cors from "cors";
import express, { Response } from "express";
import helmet from "helmet";
import morgan from "morgan";

import { AppDataSource } from "./utils/data-source";
import ErrorMiddleware from "./utils/middleware";


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));


// endpoints


// HEALTH CHECKER
app.get("/healthchecker", async (_, res: Response) => {
  res.status(200).json({
    status: "success",
    message: "Service up",
  });
});

// UNHANDLED ROUTE
app.all("*", (req, res, next) => {
  res.status(404).json({
    message: "Route not found",
  });
});

// GLOBAL ERROR HANDLER
app.use(ErrorMiddleware);

console.log("Initializing database connection...");

AppDataSource.initialize()
  .then(() => {
    console.log("***Database connected");

    const port = Number(process.env.PORT) || 5000;
    app.listen(port);

    console.log(`***Server started on port: ${port}`);
  })
  .catch((error) => console.log({ error }));
