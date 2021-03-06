import { DATABASE_CONNECTION_ERROR } from '../../constants/objects/errors';
import { ErrorObjectTypes } from '../../types/objects/errors';
import ApplicationResponse from '../application-response';
import CustomError from './custom-error';
import UniversalError from './universal-error';

interface IDatabaseConnectionError {
  type: string;
  status: number;
  code: string;
  message: string;
  reason: string;
}

class DatabaseConnectionError extends CustomError {
  public readonly type = DATABASE_CONNECTION_ERROR;
  status: number = 500;
  code: string = 'DATABASE_CONNECTION_ERROR';
  message: string = 'Error connecting to the database.';
  private _reason: string;

  constructor(reason: string) {
    super();
    this._reason = reason;
    // only because we are extending a built-in class
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  toJSON(): IDatabaseConnectionError {
    return {
      type: this.type,
      status: this.status,
      code: this.code,
      message: this.message,
      reason: this.reason,
    };
  }

  toApplicationResponse(): ApplicationResponse<undefined, UniversalError> {
    const formattedErrors: ErrorObjectTypes.UniversalErrorItem[] = [
      {
        message: this.reason,
      },
    ];
    const universalError = new UniversalError(this.type, formattedErrors);

    return new ApplicationResponse(
      this.status,
      this.code,
      this.message,
      undefined,
      universalError
    );
  }

  get reason() {
    return this._reason;
  }

  set reason(reason: string) {
    this._reason = reason;
  }
}

export default DatabaseConnectionError;
