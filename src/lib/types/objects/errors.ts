export namespace ErrorObjectTypes {
  export interface UniversalErrorItem {
    message: string;
    field?: string;
  }
  export type DatabaseOperationErrorTypes =
    | 'exists'
    | 'save'
    | 'find-by-id'
    | 'find-one'
    | 'find';
  export type EntityErrorTypes = 'user' | 'ticket' | 'order';
  export type LibraryErrorTypes = 'bcrypt';
}
