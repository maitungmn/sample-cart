import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { BaseCollections } from './base-collections';

export interface CategoriesAttrs {
  title: string
  productIDs?: mongoose.Types.ObjectId[]
}

export interface CategoriesDoc extends mongoose.Document {
  title: string
  productIDs?: mongoose.Types.ObjectId[]
  version?: number
}

interface CategoriesModel extends mongoose.Model<CategoriesDoc> {
  build(attrs: CategoriesAttrs): CategoriesDoc
}

const categoriesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  productIDs: {
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
categoriesSchema.set('versionKey', 'version');
categoriesSchema.plugin(updateIfCurrentPlugin);
categoriesSchema.statics.build = (attrs: CategoriesAttrs) => new Categories(attrs);

const Categories = mongoose.model<CategoriesDoc, CategoriesModel>(
  BaseCollections.CATEGORIES,
  categoriesSchema,
);

export { Categories };
