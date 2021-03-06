import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { BaseCollections } from './base-collections';

interface UsersAttrs {
  name: string;
  address: string;
  phone: string;
  email: string;
  cart?: mongoose.Types.ObjectId[];
}

export interface UsersDoc extends mongoose.Document {
  name: string;
  address: string;
  phone: string;
  email: string;
  cart?: mongoose.Types.ObjectId[];
  version: number;
}

interface UsersModel extends mongoose.Model<UsersDoc> {
  build(attrs: UsersAttrs): UsersDoc
}

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cart: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: BaseCollections.PRODUCTS,
  },
}, {
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
    },
  },
});

// Update version field '__v'
usersSchema.set('versionKey', 'version');
usersSchema.plugin(updateIfCurrentPlugin);
usersSchema.statics.build = (attrs: UsersAttrs) => new Users(attrs);

const Users = mongoose.model<UsersDoc, UsersModel>(
  BaseCollections.USERS,
  usersSchema,
);

export { Users };
