import mongoose from 'mongoose';

import { Categories } from '../categories';

describe('Test packages/server/src/models/categories.ts', () => {
  const mockId = new mongoose.Types.ObjectId('5b681f5b61020f2d8ad4768d');
  const mockId2 = new mongoose.Types.ObjectId('5b681f5b61020f2d8ad4766d');

  const mockResult = {
    productIDs: ['5b681f5b61020f2d8ad4768d', '5b681f5b61020f2d8ad4766d'],
    title: 'Clothings',
    version: 0,
    id: '',
  };

  it('implements not error', async () => {
    const category = Categories.build({
      title: 'Clothings',
      productIDs: [mockId, mockId2],
    });

    const result = await category.save();
    mockResult.id = result.id;

    expect(JSON.stringify(result)).toEqual(JSON.stringify(mockResult));
  });
});
