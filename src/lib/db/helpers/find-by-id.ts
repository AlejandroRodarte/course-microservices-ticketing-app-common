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
}: DBHelpersTypes.FindByIdArgs<DocumentType, ModelType>) {
  try {
    const model = await Model.findById(id);
    return [model, undefined];
  } catch (e) {
    return [
      undefined,
      new objects.errors.DatabaseOperationError('find-by-id', errorMessage),
    ];
  }
}

export default findById;
