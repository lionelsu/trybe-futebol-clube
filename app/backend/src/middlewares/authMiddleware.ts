import { NextFunction, Request, Response } from 'express';
import JWT from '../auth/JWT';

const jwtAuth = new JWT();

export default (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const bearerToken = authorization.split(' ')[1];
    const authToken = jwtAuth.decrypt(bearerToken);

    res.locals.user = authToken;

    next();
  } catch (e) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};
