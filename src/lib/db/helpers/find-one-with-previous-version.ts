import mongoose from 'mongoose';
import { DBHelpersTypes } from '../../types/db/helpers';
import findOne from './find-one';

async function findOneWithPreviousVersion<
  DocumentType extends { version: number },
  ModelType extends mongoose.Model<DocumentType>
>({
  Model,
  filters,
  version,
  errorMessage,
}: DBHelpersTypes.FindOneWithPreviousVersionArgs<
  DocumentType,
  ModelType
>): DBHelpersTypes.FindOneWithPreviousVersionReturns<DocumentType> {
  const [document, findOneDocumentError] = await findOne<
    DocumentType,
    ModelType
  >({
    Model,
    filters: {
      ...filters,
      version: version - 1,
    },
    errorMessage,
  });

  if (findOneDocumentError) return [undefined, findOneDocumentError];
  return [document, undefined];
}

export default findOneWithPreviousVersion;
