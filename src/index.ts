import { __isProd__ } from "./utils/helpers";
!__isProd__ && require("dotenv").config()

import cors from "cors";
import express, { Response } from "express";
import helmet from "helmet";
import morgan from "morgan";

import {Container} from "typedi"

import { AppDataSource } from "./utils/data-source";
import ErrorMiddleware, { authenticationMiddleware } from "./utils/middleware";
import { UserController } from "./controllers/UserController";


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));


// endpoints
const userController = Container.get(UserController)
app.post("/signup", (req, res, next) => userController.signUp(req, res, next))
app.post("/login", (req, res, next) => userController.login(req, res, next))
app.get("/me", authenticationMiddleware, (req, res, next) => userController.getCurrentLoggedInUser(req, res, next))
app.put("/me/update-password", authenticationMiddleware, (req, res, next) => userController.updatePassword(req, res, next))
app.get("/user/:id", authenticationMiddleware, (req, res, next) => userController.findById(req, res, next))
app.post("/user/:id/follow", authenticationMiddleware, (req, res, next) => userController.followUser(req, res, next))
app.delete("/user/:id/unfollow", authenticationMiddleware, (req, res, next) => userController.unFollowUser(req, res, next))
app.get("/most-followed", authenticationMiddleware, (req, res, next) => userController.followUser(req, res, next))



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
