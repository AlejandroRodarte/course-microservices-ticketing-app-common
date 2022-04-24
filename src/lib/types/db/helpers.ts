import { Document, FilterQuery } from 'mongoose';
import DatabaseOperationError from '../../objects/errors/database-operation-error';
import { ReturnTypes } from '../returns';

export namespace DBHelpersTypes {
  // Model.exists()
  type ExistsDataType<DocumentType> = Pick<
    Document<DocumentType, any, any>,
    '_id'
  > | null;
  type ExistsFunction<DocumentType> = (
    filter: FilterQuery<DocumentType>
  ) => ReturnTypes.AsyncTuple<
    ExistsDataType<Document>,
    InstanceType<typeof DatabaseOperationError>
  >;
  // Model.save()
  type SaveFunction<DocumentType> = (
    document: DocumentType
  ) => ReturnTypes.AsyncTuple<
    DocumentType,
    InstanceType<typeof DatabaseOperationError>
  >;
  // Model.findOneById()
  type FindByIdDataType<DocumentType> =
    | (DocumentType & {
        _id: any;
      })
    | null;
  type FindByIdFunction<DocumentType> = (
    id: string
  ) => ReturnTypes.AsyncTuple<
    FindByIdDataType<DocumentType>,
    InstanceType<typeof DatabaseOperationError>
  >;
  // Model.findOne()
  type FindOneDataType<DocumentType> = FindByIdDataType<DocumentType>;
  type FindOneFunction<DocumentType> = (
    filter: FilterQuery<DocumentType>
  ) => ReturnTypes.AsyncTuple<
    FindOneDataType<DocumentType>,
    InstanceType<typeof DatabaseOperationError>
  >;
}
