import { model, Schema, Document } from 'mongoose';
import { Code } from '@interfaces/codes.interface';

const codeSchema: Schema = new Schema({
  snippet: {
    type: String,
    required: true,
  },
  isPrivate: {
    type: Boolean,
    required: false,
  },
  password: {
    type: String,
    required: false,
  },
});

const codeModel = model<Code & Document>('Code', codeSchema);

export default codeModel;
