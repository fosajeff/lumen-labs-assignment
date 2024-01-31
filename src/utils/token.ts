import {Request} from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

export interface IToken {
  id: string;
  expiresIn: string;
}

export const generateToken = (user: User): string => {
  return jwt.sign(
    { id: user.id, is_active: user.is_active },
    process.env.JWT_ACCESS_TOKEN_KEY as jwt.Secret,
    { expiresIn: process.env.JWT_EXPIRES_AT }
  );
};

export const verifyToken = async (
  token: string
): Promise<jwt.VerifyErrors | IToken> => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      process.env.JWT_ACCESS_TOKEN_KEY as jwt.Secret,
      (err, payload) => {
        if (err) return reject(err);

        resolve(payload as IToken);
      }
    );
  });
};

export const decodeJwt = (token: string) => jwt.decode(token);

export function getBearerToken(req: Request): string | undefined {
  return req.headers.authorization?.split("Bearer ")[1].trim();
}

export default { generateToken, verifyToken };
