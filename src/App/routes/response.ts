import { Response } from 'express';
//buscar una forma de añadir un tipo de mensaje como un array de un tipo genérico.
export const success = (message: any, statusCode: number, res: Response): void => {
  res.json(message).status(statusCode);
};

export const error = (message: string, statusCode: number, err: string, res: Response): void => {
  res.json(message).status(statusCode);
  console.log(err);
};
