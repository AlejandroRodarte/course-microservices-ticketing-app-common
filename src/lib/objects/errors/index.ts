import BadCredentialsError from './bad-credentials-error';
import BadEntityError from './bad-entity-error';
import BadTokenError from './bad-token-error';
import DatabaseConnectionError from './database-connection-error';
import DatabaseOperationError from './database-operation-error';
import EntityNotFoundError from './entity-not-found-error';
import LibraryError from './library-error';
import NatsPublisherError from './nats-publisher-error';
import RequestValidationError from './request-validation-error';
import RouteNotFoundError from './route-not-found-error';
import UnauthorizedError from './unauthorized-error';
import UniversalError from './universal-error';

const errors = {
  BadCredentialsError,
  BadEntityError,
  BadTokenError,
  DatabaseConnectionError,
  DatabaseOperationError,
  EntityNotFoundError,
  LibraryError,
  NatsPublisherError,
  RequestValidationError,
  RouteNotFoundError,
  UnauthorizedError,
  UniversalError,
};

export default errors;
