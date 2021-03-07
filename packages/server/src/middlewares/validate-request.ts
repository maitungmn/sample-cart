import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { ECommons } from '../commons';

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).send({ error: ECommons.InvalidBody });
    return;
  }

  next();
};
