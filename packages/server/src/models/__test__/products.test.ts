import mongoose from 'mongoose';
import { Products } from '../products';

describe('Test packages/server/src/models/products.ts', () => {
  const mockImageUrl = 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80';
  const mockCategoryId = new mongoose.Types.ObjectId('5b681f5b61020f2d8ad4768d');

  const mockResult = {
    name: 'T-Shirt',
    categoryID: '5b681f5b61020f2d8ad4768d',
    price: 50,
    imageUrl: mockImageUrl,
    version: 0,
    id: '',
  };

  it('implements not error', async () => {
    const product = Products.build({
      name: 'T-Shirt',
      categoryID: mockCategoryId,
      price: 50,
      imageUrl: mockImageUrl,
    });

    const result = await product.save();
    mockResult.id = result.id;

    expect(JSON.stringify(result)).toEqual(JSON.stringify(mockResult));
  });
});
