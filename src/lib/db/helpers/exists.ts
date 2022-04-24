import { DBHelpersTypes } from '../../types/db/helpers';
import objects from '../../objects';
import mongoose from 'mongoose';

async function exists<
  DocumentType,
  ModelType extends mongoose.Model<DocumentType>
>({
  Model,
  filters,
  errorMessage,
}: DBHelpersTypes.ExistsArgs<
  DocumentType,
  ModelType
>): DBHelpersTypes.ExistsReturns<DocumentType> {
  try {
    const modelExists = await Model.exists(filters);
    return [modelExists, undefined];
  } catch (e) {
    return [
      undefined,
      new objects.errors.DatabaseOperationError('exists', errorMessage),
    ];
  }
}

export default exists;
