import { Schema, model, Document } from 'mongoose';

export const DOCUMENT_NAME = 'Site';
export const COLLECTION_NAME = 'sites';

export const enum SiteCode {
  DC = 'DC',
  THEQOO = 'THEQOO',
  NAVER = 'NAVER',
  YOUTUBE = 'YOUTUBE',
}

export default interface Site extends Document {
  code: string;
}

const schema = new Schema(
  {
    code: {
      type: Schema.Types.String,
      required: true,
      enum: [SiteCode.DC, SiteCode.THEQOO, SiteCode.NAVER, SiteCode.YOUTUBE],
    },
  },
  {
    versionKey: false,
  },
);

export const SiteModel = model<Site>(DOCUMENT_NAME, schema, COLLECTION_NAME);
