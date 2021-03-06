import mongoose from 'mongoose';
import { Users } from '../users';

describe('Test packages/server/src/models/users.ts', () => {
  const mockProductId = new mongoose.Types.ObjectId('4c281f5b61020f2d8ad4767e');
  const mockProductId2 = new mongoose.Types.ObjectId('4c281f5b61020f2d8ad4762e');

  const mockResult = {
    cart: ['4c281f5b61020f2d8ad4767e', '4c281f5b61020f2d8ad4762e'],
    userID: '11281f5b61020f2d8ad4767e',
    address: 'Address 1',
    email: 'user1@test.com',
    name: 'User test',
    phone: '12345678',
    version: 0,
    id: '',
  };

  it('implements not error', async () => {
    const user = Users.build({
      userID: '11281f5b61020f2d8ad4767e',
      address: 'Address 1',
      email: 'user1@test.com',
      name: 'User test',
      phone: '12345678',
      cart: [mockProductId, mockProductId2],
    });

    const result = await user.save();
    mockResult.id = result.id;

    expect(JSON.stringify(result)).toEqual(JSON.stringify(mockResult));
  });
});
