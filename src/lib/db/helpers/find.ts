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
  opts,
}: DBHelpersTypes.FindArgs<
  DocumentType,
  ModelType
>): DBHelpersTypes.FindReturns<DocumentType> {
  try {
    const query = Model.find(filters);
    if (opts?.populateFields)
      opts.populateFields.forEach((field) => query.populate(field));
    const documents = await query;
    return [documents, undefined];
  } catch (e) {
    return [
      undefined,
      new objects.errors.DatabaseOperationError('find', errorMessage),
    ];
  }
}

export default find;
