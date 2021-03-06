import request from 'supertest';
import { Types } from 'mongoose';
import { app } from '../../app';
import { baseFetchProductsByUserIDRoute } from '../fetchProductsByUserId';
import { ECommons } from '../../commons';
import { Categories, Products, Users } from '../../models';

describe('Test packages/server/src/routes/fetchProductsByUserId.ts', () => {
  const defaultUserID = '60431ccf2d1807f27e57e466';

  const mockProductObjectId = new Types.ObjectId();
  const mockDefaultUser = {
    userID: defaultUserID,
    name: 'user test',
    address: 'address test',
    phone: 'phone test',
    email: 'email test',
    cart: [mockProductObjectId],
  };

  const mockUserEmptyCart = {
    ...mockDefaultUser,
    cart: [],
  };

  const mockUserNullCart = {
    ...mockDefaultUser,
    cart: null,
  };

  const mockDefaultProduct = {
    id: mockProductObjectId,
    name: 'Product 1',
    imageUrl: 'https://source.unsplash.com/random/300x300',
    price: 28,
  };

  it('can fetch fetchProductsByUserIDRouter api', async () => {
    await request(app)
      .get(baseFetchProductsByUserIDRoute)
      .set('Authorization', defaultUserID)
      .expect(200);
  });

  it('expect get error when missing userID ', async () => {
    const res = await request(app)
      .get(baseFetchProductsByUserIDRoute);

    expect(res.status).toEqual(400);
    expect(res.body.error).toEqual(ECommons.MissingUserID);
  });

  it('expect get empty when user not found', async () => {
    Users.findOne = jest.fn().mockResolvedValue(null);

    const res = await request(app)
      .get(baseFetchProductsByUserIDRoute)
      .set('Authorization', defaultUserID);

    expect(res.status).toEqual(200);
    expect(res.body.data).toEqual([]);
  });

  it('expect get empty when user cart empty', async () => {
    Users.findOne = jest.fn().mockResolvedValue(mockUserEmptyCart);

    const res = await request(app)
      .get(baseFetchProductsByUserIDRoute)
      .set('Authorization', defaultUserID);

    expect(res.status).toEqual(200);
    expect(res.body.data).toEqual([]);
  });

  it('expect get empty when user cart not found', async () => {
    Users.findOne = jest.fn().mockResolvedValue(mockUserNullCart);

    const res = await request(app)
      .get(baseFetchProductsByUserIDRoute)
      .set('Authorization', defaultUserID);

    expect(res.status).toEqual(200);
    expect(res.body.data).toEqual([]);
  });

  it('expect get correct result', async () => {
    Users.findOne = jest.fn().mockResolvedValue(mockDefaultUser);
    Products.find = jest.fn().mockResolvedValue([mockDefaultProduct]);

    const res = await request(app)
      .get(baseFetchProductsByUserIDRoute)
      .set('Authorization', defaultUserID);

    expect(res.status).toEqual(200);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  it('products null', async () => {
    Users.findOne = jest.fn().mockResolvedValue(mockDefaultUser);
    Products.find = jest.fn().mockResolvedValue(null);

    const res = await request(app)
      .get(baseFetchProductsByUserIDRoute)
      .set('Authorization', defaultUserID);

    expect(res.status).toEqual(200);
    expect(res.body.data).toEqual([]);
  });

  it('expect get error default', async () => {
    const jwtSpy = jest.spyOn(Users, 'findOne');
    jwtSpy.mockImplementationOnce(() => {
      throw new Error(ECommons.DefaultError);
    });

    const res = await request(app)
      .get(baseFetchProductsByUserIDRoute)
      .set('Authorization', defaultUserID);

    expect(res.status).toEqual(400);
  });
});
