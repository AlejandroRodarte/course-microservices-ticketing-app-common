import mongoose from 'mongoose';
import objects from '../../objects';
import { DBHelpersTypes } from '../../types/db/helpers';

async function find<
  DocumentType,
  ModelType extends mongoose.Model<DocumentType>
>({
  Model,
  filters,
  errorMessage,
}: DBHelpersTypes.FindArgs<
  DocumentType,
  ModelType
>): DBHelpersTypes.FindReturns<DocumentType> {
  try {
    const documents = await Model.find(filters);
    return [documents, undefined];
  } catch (e) {
    return [
      undefined,
      new objects.errors.DatabaseOperationError('find', errorMessage),
    ];
  }
}

export default find;
