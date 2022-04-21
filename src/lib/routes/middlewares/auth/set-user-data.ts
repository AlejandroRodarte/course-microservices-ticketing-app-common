import { NextFunction } from 'express';
import jwt from '../../../jwt';
import UnauthorizedError from '../../../objects/errors/unauthorized-error';
import { JwtTypes } from '../../../types/jwt';
import { MiddlewareTypes } from '../../../types/middlewares';

const setUserData = (
  req: MiddlewareTypes.VerifyTokenExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt)
    return next(new UnauthorizedError('There is no token in the request.'));

  const [payload, badTokenError] = jwt.verify(req.session.jwt);
  if (typeof payload === 'undefined' && badTokenError)
    return next(new UnauthorizedError(badTokenError.reason));

  req['jwt/user-data'] = payload as JwtTypes.UserData;
  next();
};

export default setUserData;
