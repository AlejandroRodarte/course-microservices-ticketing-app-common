import { ErrorObjectTypes } from '../../types/objects/errors';

interface IUniversalError {
  type: string;
  errors: ErrorObjectTypes.UniversalErrorItem[];
}

class UniversalError {
  private _type: string;
  private _errors: ErrorObjectTypes.UniversalErrorItem[];

  constructor(type: string, errors: ErrorObjectTypes.UniversalErrorItem[]) {
    this._type = type;
    this._errors = errors;
  }

  toJSON(): IUniversalError {
    return {
      type: this.type,
      errors: this.errors,
    };
  }

  get type() {
    return this._type;
  }

  get errors() {
    return this._errors;
  }

  set type(type: string) {
    this._type = type;
  }

  set errors(errors: ErrorObjectTypes.UniversalErrorItem[]) {
    this._errors = errors;
  }
}

export default UniversalError;
