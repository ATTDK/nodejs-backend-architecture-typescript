import { Schema, model, Document } from 'mongoose';

export const DOCUMENT_NAME = 'Comment';
export const COLLECTION_NAME = 'comments';

//안쓸듯
export default interface Comment extends Document {
  comment: string;
  createdAt?: Date;
  haveSubComment : Boolean;
  subComment? : string;
}

const schema = new Schema(
  {
    comment: {
      type: Schema.Types.String,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
      select: false,
    },
  },
  {
    versionKey: false,
  },
);

export const CommentModel = model<Comment>(DOCUMENT_NAME, schema, COLLECTION_NAME);
