import { ErrorRequestHandler } from 'express';
import ApplicationResponse from '../../../objects/application-response';
import CustomError from '../../../objects/errors/custom-error';

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof CustomError)
    return res.status(200).send(err.toApplicationResponse());
  return res.status(200).send(ApplicationResponse.getGenericErrorResponse());
};

export default errorHandler;
