import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { BaseCollections } from './base-collections';

interface ProductsAttrs {
  name: string;
  imageUrl: string;
  price: number;
  categoryID: mongoose.Types.ObjectId;
  userID?: mongoose.Types.ObjectId[];
}

export interface ProductsDoc extends mongoose.Document {
  name: string;
  imageUrl: string;
  price: number;
  categoryID: mongoose.Types.ObjectId;
  userID?: mongoose.Types.ObjectId[];
  version: number;
}

interface ProductsModel extends mongoose.Model<ProductsDoc> {
  build(attrs: ProductsAttrs): ProductsDoc
}

const productsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  categoryID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: BaseCollections.CATEGORIES,
    required: true,
  },
  userID: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: BaseCollections.USERS,
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
productsSchema.set('versionKey', 'version');
productsSchema.plugin(updateIfCurrentPlugin);
productsSchema.statics.build = (attrs: ProductsAttrs) => new Products(attrs);

const Products = mongoose.model<ProductsDoc, ProductsModel>(
  BaseCollections.PRODUCTS,
  productsSchema,
);

export { Products };
