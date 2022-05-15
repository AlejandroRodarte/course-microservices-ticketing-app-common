import { NATS_ERROR } from '../../constants/objects/errors';
import { ErrorObjectTypes } from '../../types/objects/errors';
import ApplicationResponse from '../application-response';
import CustomError from './custom-error';
import UniversalError from './universal-error';

interface INatsError {
  type: string;
  status: number;
  code: string;
  message: string;
  reason: string;
}

class NatsError extends CustomError {
  public readonly type = NATS_ERROR;
  status: number = 500;
  code: string = 'NATS_ERROR';
  message: string = 'An error occured while interacting with the NATS server.';
  private _reason: string;

  constructor(reason: string) {
    super();
    this._reason = reason;
    // only because we are extending a built-in class
    Object.setPrototypeOf(this, NatsError.prototype);
  }

  toJSON(): INatsError {
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

export default NatsError;
