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
    },
    content: {
      type: Schema.Types.String,
      required: true,
    },
    contentNumber: {
      type: Schema.Types.Number,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
      select: false,
    },
    roles: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Site',
        },
      ],
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
    },
    views: {
      type: Schema.Types.Number,
      required: true,
    },
    like: {
      type: Schema.Types.Number,
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

export const ContentModel = model<Content>(DOCUMENT_NAME, schema, COLLECTION_NAME);
