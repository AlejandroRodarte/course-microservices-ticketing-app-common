import mongoose from 'mongoose';
import objects from '../../objects';
import { DBHelpersTypes } from '../../types/db/helpers';

async function save<DocumentType extends mongoose.Document>({
  document,
  errorMessage,
}: DBHelpersTypes.SaveArgs<DocumentType>): DBHelpersTypes.SaveReturns<DocumentType> {
  try {
    const savedDocument = await document.save();
    return [savedDocument, undefined];
  } catch (e) {
    return [
      undefined,
      new objects.errors.DatabaseOperationError('save', errorMessage),
    ];
  }
}

export default save;
