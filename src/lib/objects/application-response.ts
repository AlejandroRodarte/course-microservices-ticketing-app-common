interface IApplicationResponse<DataType, ErrorType> {
  status: number;
  code: string;
  message: string;
  data: DataType;
  error: ErrorType;
}

class ApplicationResponse<DataType, ErrorType> {
  private _status: number;
  private _code: string;
  private _message: string;
  private _data: DataType;
  private _error: ErrorType;

  constructor(
    status: number,
    code: string,
    message: string,
    data: DataType,
    error: ErrorType
  ) {
    this._status = status;
    this._code = code;
    this._message = message;
    this._data = data;
    this._error = error;
  }

  toJSON(): IApplicationResponse<DataType, ErrorType> {
    return {
      status: this.status,
      code: this.code,
      message: this.message,
      data: this.data,
      error: this.error,
    };
  }

  static getGenericErrorResponse(): ApplicationResponse<undefined, undefined> {
    return new ApplicationResponse<undefined, undefined>(
      400,
      'GENERIC_ERROR',
      'Something went wrong with the application.',
      undefined,
      undefined
    );
  }

  get status() {
    return this._status;
  }

  get code() {
    return this._code;
  }

  get message() {
    return this._message;
  }

  get data() {
    return this._data;
  }

  get error() {
    return this._error;
  }

  set status(status: number) {
    this._status = status;
  }

  set code(code: string) {
    this._code = code;
  }

  set message(message: string) {
    this._message = message;
  }

  set data(data: DataType) {
    this._data = data;
  }

  set error(error: ErrorType) {
    this._error = error;
  }
}

export default ApplicationResponse;
