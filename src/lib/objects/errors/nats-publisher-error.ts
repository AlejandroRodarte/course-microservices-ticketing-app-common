import { NATS_PUBLISHER_ERROR } from '../../constants/objects/errors';
import { ErrorObjectTypes } from '../../types/objects/errors';
import ApplicationResponse from '../application-response';
import CustomError from './custom-error';
import UniversalError from './universal-error';

interface INatsPublisherError {
  type: string;
  status: number;
  code: string;
  message: string;
  reason: string;
}

class NatsPublisherError extends CustomError {
  public readonly type = NATS_PUBLISHER_ERROR;
  status: number = 500;
  code: string = 'NATS_PUBLISHER_ERROR';
  message: string =
    'An error occured while publishing the event to the NATS server.';
  private _reason: string;

  constructor(reason: string) {
    super();
    this._reason = reason;
    // only because we are extending a built-in class
    Object.setPrototypeOf(this, NatsPublisherError.prototype);
  }

  toJSON(): INatsPublisherError {
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

export default NatsPublisherError;
