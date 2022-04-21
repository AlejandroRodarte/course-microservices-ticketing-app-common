import jwt from 'jsonwebtoken';
import { JwtTypes } from '../types/jwt';

const sign: JwtTypes.SignFunction = (args) => {
  const token = jwt.sign(args.payload, args.secret);
  return token;
};

export default sign;
