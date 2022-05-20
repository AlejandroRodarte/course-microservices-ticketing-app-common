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
  opts,
}: DBHelpersTypes.FindByIdArgs<
  DocumentType,
  ModelType
>): DBHelpersTypes.FindByIdReturns<DocumentType> {
  try {
    const query = Model.findById(id);
    if (opts?.populateFields)
      opts.populateFields.forEach((field) => query.populate(field));
    const document = await query;
    return [document, undefined];
  } catch (e) {
    return [
      undefined,
      new objects.errors.DatabaseOperationError('find-by-id', errorMessage),
    ];
  }
}

export default findById;
