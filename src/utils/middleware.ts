import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import HttpException from "./exception";
import { IToken, verifyToken } from "./token";

export default function errorMiddleware(
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const status = error.status || 500;
  const message = error.message || "Internal Server Error.";

  res.status(status).json({ status, message, stack: error.stack });
}

export async function authenticationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith("Bearer ")) {
    return next(new HttpException(401, "Unauthorized"));
  }

  const token = bearer.split("Bearer ")[1].trim();

  try {
    const payload: IToken | jwt.JsonWebTokenError = await verifyToken(token);

    if (payload instanceof jwt.JsonWebTokenError) {
      return next(new HttpException(401, "Unauthorized"));
    }

    return next();
  } catch (err) {
    return next(new HttpException(400, "Invalid token"));
  }
}

