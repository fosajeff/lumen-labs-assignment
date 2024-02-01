import { NextFunction, Request, Response } from "express";
import { Service } from "typedi";

import { FollowService } from "../services/FollowService";
import { getBearerToken, IToken, verifyToken } from "../utils/token";
import { success } from "../utils/response";

@Service()
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  
  async follow(request: Request, response: Response, next: NextFunction) {
    const id = Number(request.params.id); // person being followed
    const token = getBearerToken(request); // by the follower who made the follow request
    const payload: IToken = await verifyToken(token);
    const user_id = payload.id; 
    const data = {
        followerId: user_id,
        followeeId: id
    }
    const result = await this.followService.follow(data.followerId, data.followeeId);
    return success(response, {}, 201, "User followed successfully");
  }

  async unfollow(request: Request, response: Response, next: NextFunction) {
    const id = Number(request.params.id);
    const token = getBearerToken(request);
    const payload: IToken = await verifyToken(token);
    const user_id = payload.id; 
    const data = {
        followerId: user_id,
        followeeId: id
    }
    const result = await this.followService.unfollow(data.followerId, data.followeeId);
    return success(response, {}, 204, "User unfollowed successfully");
  }

  async mostFollowed(request: Request, response: Response, next: NextFunction) {
    const result = await this.followService.mostFollowed();
    return success(response, result)
  }
}
