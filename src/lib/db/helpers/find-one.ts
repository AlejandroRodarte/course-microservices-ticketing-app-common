import mongoose from 'mongoose';
import objects from '../../objects';
import { DBHelpersTypes } from '../../types/db/helpers';

async function findOne<
  DocumentType,
  ModelType extends mongoose.Model<DocumentType>
>({
  Model,
  filters,
  errorMessage,
}: DBHelpersTypes.FindOneArgs<
  DocumentType,
  ModelType
>): DBHelpersTypes.FindOneReturns<DocumentType> {
  try {
    const document = await Model.findOne(filters);
    return [document, undefined];
  } catch (e) {
    return [
      undefined,
      new objects.errors.DatabaseOperationError('find-one', errorMessage),
    ];
  }
}

export default findOne;
