import { Schema, model, Document, Number } from 'mongoose';
import Site, { SiteCode } from './Site';
export const DOCUMENT_NAME = 'Content';
export const COLLECTION_NAME = 'contents';

export default interface Content extends Document {
  title : string;
  content : string;
  contentNumber : Number;
  createdAt?: Date;
  sites : Site[];
  haveComment : Boolean;
  comment? : string;
  views : Number;
  like : Number;
}

const schema = new Schema(
  {
    title: {
      type: Schema.Types.String,
      required: true,
      trim : true,
    },
    content: {
      type: Schema.Types.String,
      required: true,
      trim : true,
    },
    contentNumber: {
      type: Schema.Types.Number,
      required: true,
      trim : true,
    },
    createdAt: {
      type: Date,
      required: true,
      select: false,
    },
    haveComment: {
      type: Schema.Types.String,
      required: true,
    },
    comment: {
      type: Schema.Types.String,
      required: true,
      select: false,
      trim : true,
    },
    views: {
      type: Schema.Types.Number,
      required: true,
      trim : true,
    },
    like: {
      type: Schema.Types.Number,
      required: true,
      trim : true,
    },
  },
  {
    versionKey: false,
  },
);

export const ContentModel = model<Content>(DOCUMENT_NAME, schema, COLLECTION_NAME);
