import auth from './auth';
import errors from './errors';
import validation from './validation';

const middlewares = {
  auth,
  errors,
  validation,
};

export default middlewares;
