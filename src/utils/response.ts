import { Response } from "express";

export const success = (
  res: Response,
  payload?: any,
  status?: number,
  message?: string
) =>
  res.status(status || 200).json({
    success: true,
    message: message || "Successful",
    payload,
  });

export const fail = (
  res: Response,
  payload?: any,
  status?: number,
  message?: string
) =>
  res.status(status || 500).json({
    success: false,
    message: message || "An unexpected error occured",
    payload,
  });
