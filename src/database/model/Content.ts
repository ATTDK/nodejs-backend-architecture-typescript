import { Schema, model, Document, Number } from 'mongoose';
import Site, { SiteCode } from './Site';
export const DOCUMENT_NAME = 'Content';
export const COLLECTION_NAME = 'contents';

export default interface Content extends Document {
  title? : string;
  views? : string;
  likes? : string;
  content? : string;
  commentCount? : string;
  link? : string | null | undefined;
  writer? : string;
  created?: string;
  sites? : string;
  comment? : string;
}

const schema = new Schema(
  {
    title: {
      type: Schema.Types.String,
      required: false,
      trim : true,
    },
    views: {
      type: Schema.Types.String,
      required: false,
      trim : true,
    },
    likes: {
      type: Schema.Types.String,
      required: false,
      trim : true,
    },
    content: {
      type: Schema.Types.String,
      required: false,
      trim : true,
    },
    commentCount: {
      type: Schema.Types.String,
      required: false,
      trim : true,
    },
    link: {
      type: Schema.Types.String,
      required: false,
      trim : true,
    },
    writer : {
      type: Schema.Types.String,
      required: false,
      trim : true,
    },
    created: {
      type: Schema.Types.String,
      required: false,
      select: false,
    },
    sites: {
      type: Schema.Types.String,
      required: false,
      trim : true,
    },
    comment: {
      type: Schema.Types.String,
      required: false,
      select: false,
      trim : true,
    },
  },
  {
    versionKey: false,
  },
);

export const ContentModel = model<Content>(DOCUMENT_NAME, schema, COLLECTION_NAME);
