import jwt from 'jsonwebtoken';
import BadTokenError from '../objects/errors/bad-token-error';
import { JwtTypes } from '../types/jwt';

const verify: JwtTypes.VerifyFunction = (args) => {
  try {
    const payload = jwt.verify(args.token, args.secret);
    return [payload, undefined];
  } catch (e) {
    return [
      undefined,
      new BadTokenError('The authentication token has been tampered.'),
    ];
  }
};

export default verify;
