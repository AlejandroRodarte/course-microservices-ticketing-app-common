import mongoose from 'mongoose';
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
  export type SaveDataType<DocumentType> = DocumentType;
  export type SaveFunction<DocumentType> = (
    document: DocumentType
  ) => SaveDataType<DocumentType>;
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
  // exists() wrapper definitions
  export interface ExistsArgs<
    DocumentType,
    ModelType extends mongoose.Model<DocumentType>
  > {
    Model: ModelType;
    filters: FilterQuery<DocumentType>;
    errorMessage: string;
  }
  export type ExistsReturns<DocumentType> = ReturnTypes.AsyncTuple<
    ExistsDataType<DocumentType>,
    InstanceType<typeof DatabaseOperationError>
  >;
  // findById() wrapper definitions
  export interface FindByIdArgs<
    DocumentType,
    ModelType extends mongoose.Model<DocumentType>
  > {
    Model: ModelType;
    id: string;
    errorMessage: string;
  }
  export type FindByIdReturns<DocumentType> = ReturnTypes.AsyncTuple<
    FindByIdDataType<DocumentType>,
    InstanceType<typeof DatabaseOperationError>
  >;
  // findOne() wrapper definitions
  export interface FindOneArgs<
    DocumentType,
    ModelType extends mongoose.Model<DocumentType>
  > {
    Model: ModelType;
    filters: FilterQuery<DocumentType>;
    errorMessage: string;
  }
  export type FindOneReturns<DocumentType> = ReturnTypes.AsyncTuple<
    FindOneDataType<DocumentType>,
    InstanceType<typeof DatabaseOperationError>
  >;
  // save() wrapper definitions
  export interface SaveArgs<DocumentType extends mongoose.Document> {
    document: DocumentType;
    errorMessage: string;
  }
  export type SaveReturns<DocumentType> = ReturnTypes.AsyncTuple<
    SaveDataType<DocumentType>,
    InstanceType<typeof DatabaseOperationError>
  >;
}
