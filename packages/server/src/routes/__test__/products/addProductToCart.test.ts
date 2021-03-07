import request from 'supertest';
import { app } from '../../../app';
import { baseAPI, BaseRoute } from '../../base-route';
import { Users } from '../../../models';
import { ECommons } from '../../../commons';

describe('Test packages/server/src/routes/addProductToCart.ts', () => {
  const baseRoute = baseAPI + BaseRoute.Products;
  const defaultProductID = '60431ccf2d1807f27e57e548';
  const defaultUserID = '9237c733-230e-46b1-8e05-a4739538cc50';
  const mockDefaultUser = {
    userID: defaultUserID,
  };
  const mockUserWithCart = {
    ...mockDefaultUser,
    cart: ['60431ccf2d1807f27e57e548'],
  };

  it('expect error', async () => {
    const jwtSpy = jest.spyOn(Users, 'updateOne');
    jwtSpy.mockImplementation(() => {
      throw new Error(ECommons.DefaultError);
    });

    const res = await request(app)
      .post(`${baseRoute}/${defaultProductID}`)
      .set('Authorization', defaultUserID);

    expect(res.status).toEqual(400);
  });

  it('success with userID', async () => {
    Users.updateOne = jest.fn().mockResolvedValue({});
    await request(app)
      .post(`${baseRoute}/${defaultProductID}`)
      .set('Authorization', defaultUserID)
      .expect(200);
  });

  it('success with not available user', async () => {
    Users.findOne = jest.fn().mockResolvedValue({});
    Users.updateOne = jest.fn().mockResolvedValue({});
    await request(app)
      .post(`${baseRoute}/${defaultProductID}`)
      .set('Authorization', defaultUserID)
      .expect(200);
  });

  it('error without userID', async () => {
    Users.updateOne = jest.fn().mockResolvedValue({});
    await request(app)
      .post(`${baseRoute}/${defaultProductID}`)
      .expect(400);
  });

  it('success without user cart', async () => {
    Users.findOne = jest.fn().mockResolvedValue(mockDefaultUser);
    Users.updateOne = jest.fn().mockResolvedValue({});

    await request(app)
      .post(`${baseRoute}/${defaultProductID}`)
      .set('Authorization', defaultUserID)
      .expect(200);
  });

  it('success with user cart', async () => {
    Users.findOne = jest.fn().mockResolvedValue(mockUserWithCart);
    Users.updateOne = jest.fn().mockResolvedValue({});

    await request(app)
      .post(`${baseRoute}/${defaultProductID}`)
      .set('Authorization', defaultUserID)
      .expect(200);
  });
});
