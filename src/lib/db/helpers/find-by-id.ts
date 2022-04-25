import mongoose from 'mongoose';
import objects from '../../objects';
import { DBHelpersTypes } from '../../types/db/helpers';

async function findById<
  DocumentType,
  ModelType extends mongoose.Model<DocumentType>
>({
  Model,
  id,
  errorMessage,
}: DBHelpersTypes.FindByIdArgs<
  DocumentType,
  ModelType
>): DBHelpersTypes.FindByIdReturns<DocumentType> {
  try {
    const document = await Model.findById(id);
    return [document, undefined];
  } catch (e) {
    return [
      undefined,
      new objects.errors.DatabaseOperationError('find-by-id', errorMessage),
    ];
  }
}

export default findById;
