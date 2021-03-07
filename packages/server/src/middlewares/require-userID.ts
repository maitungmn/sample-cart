import { Request, Response, NextFunction } from 'express';
import { ECommons } from '../commons';

export const requiredAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    res.status(400).send({ error: ECommons.MissingUserID });
    return;
  }

  next();
};
