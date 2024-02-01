import { NextFunction, Request, Response } from "express";
import { VerifyErrors } from "jsonwebtoken";
import { Service } from "typedi";

import { UserService } from "../services/UserService";
import HttpException from "../utils/exception";
import { getBearerToken } from "../utils/token";
import { success } from "../utils/response";
import { IToken, decodeJwt, generateToken, verifyToken } from "../utils/token";
import { authDto, updatePasswordDto } from "../dto/auth.dto";

@Service()
export class UserController {
  constructor(private readonly userService: UserService) {}

  async signUp(request: Request, response: Response, next: NextFunction) {
    try {
      let data: authDto = request.body;
      let user = await this.userService.signUp(data);
      return success(response, user, 201, "Sign up was successful");
    } catch (error: any) {
      return next(new HttpException(error.status, error.message));
    }
  }

  async updatePassword(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      let data: updatePasswordDto = request.body;
      const user_obj = decodeJwt(getBearerToken(request));
      const user_id = user_obj.id;

      let user = await this.userService.updatePassword(user_id, data);
      return success(response, user, 200, "Password updated successful");
    } catch (error: any) {
      return next(new HttpException(error.status, error.message));
    }
  }

  async login(request: Request, response: Response, next: NextFunction) {
    try {
      let data: authDto = request.body;
      let user = await this.userService.login(data);
      const token = generateToken(user);
      return success(response, { token }, 200, "Sign in was successful");
    } catch (error: any) {
      return next(new HttpException(error.status, error.message));
    }
  }

  async findAll(request: Request, response: Response, next: NextFunction) {
    return await this.userService.find();
  }

  async findById(request: Request, response: Response, next: NextFunction) {
    try {
      const id = Number(request.params.id);
      const result = await this.userService.findById(id);
      return success(response, result);
    } catch (error) {
      return next(new HttpException(error.status, error.message));
    }
  }

  async getCurrentLoggedInUser(request: Request, response: Response, next: NextFunction) {
    const token = getBearerToken(request);
    const payload: IToken = await verifyToken(token);
    const user_id = payload.id;
    const result = await this.userService.getCurrentLoggedInUser(user_id);
    return success(response, result);
  }

}
