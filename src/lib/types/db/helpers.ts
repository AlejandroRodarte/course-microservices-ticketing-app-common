import { Document, FilterQuery } from 'mongoose';
import DatabaseOperationError from '../../objects/errors/database-operation-error';
import { ReturnTypes } from '../returns';

export namespace DBHelpersTypes {
  // Model.exists()
  export type ExistsDataType<DocumentType> = Pick<
    Document<DocumentType, any, any>,
    '_id'
  > | null;
  export type ExistsFunction<DocumentType> = (
    filter: FilterQuery<DocumentType>
  ) => ReturnTypes.AsyncTuple<
    ExistsDataType<Document>,
    InstanceType<typeof DatabaseOperationError>
  >;
  // Model.save()
  export type SaveFunction<DocumentType> = (
    document: DocumentType
  ) => ReturnTypes.AsyncTuple<
    DocumentType,
    InstanceType<typeof DatabaseOperationError>
  >;
  // Model.findOneById()
  export type FindByIdDataType<DocumentType> =
    | (DocumentType & {
        _id: any;
      })
    | null;
  export type FindByIdFunction<DocumentType> = (
    id: string
  ) => ReturnTypes.AsyncTuple<
    FindByIdDataType<DocumentType>,
    InstanceType<typeof DatabaseOperationError>
  >;
  // Model.findOne()
  export type FindOneDataType<DocumentType> = FindByIdDataType<DocumentType>;
  export type FindOneFunction<DocumentType> = (
    filter: FilterQuery<DocumentType>
  ) => ReturnTypes.AsyncTuple<
    FindOneDataType<DocumentType>,
    InstanceType<typeof DatabaseOperationError>
  >;
}
