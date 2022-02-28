import { Response } from 'express';

export const success = (message: string, statusCode: number, res: Response): void => {
  res.json(message).status(statusCode);
};

export const error = (message: string, statusCode: number, err: string, res: Response): void => {
  res.json(message).status(statusCode);
  console.log(err);
};
