import jwt from 'jsonwebtoken';
import BadTokenError from '../objects/errors/bad-token-error';

export namespace JwtTypes {
  interface SignFunctionArgs {
    payload: object;
    secret: string;
  }
  export type SignFunction = (args: SignFunctionArgs) => string;
  interface VerifyFunctionArgs {
    token: string;
    secret: string;
  }
  export type VerifyFunction = (
    args: VerifyFunctionArgs
  ) => [(string | jwt.JwtPayload) | undefined, BadTokenError | undefined];
  export interface UserData {
    id: string;
    email: string;
    iat: number;
  }
}
