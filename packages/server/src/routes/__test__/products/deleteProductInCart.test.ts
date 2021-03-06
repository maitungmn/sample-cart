import request from 'supertest';
import { Types } from 'mongoose';
import { baseAPI, BaseRoute } from '../../base-route';
import { app } from '../../../app';
import { ECommons } from '../../../commons';
import { Users } from '../../../models';

describe('Test packages/server/src/routes/deleteProductInCart.ts', () => {
  const baseRoute = baseAPI + BaseRoute.Products;
  const defaultProductID = '60431ccf2d1807f27e57e548';
  const defaultProductID2 = '60431ccf2d1807f27e57e549';
  const defaultUserID = '9237c733-230e-46b1-8e05-a4739538cc50';
  const mockDefaultUser = {
    userID: defaultUserID,
  };
  const mockUserWithCart = {
    ...mockDefaultUser,
    cart: [defaultProductID],
  };

  const mockUserWithEmptyCart = {
    ...mockDefaultUser,
    cart: [],
  };

  const mockUserWithNullCart = {
    ...mockDefaultUser,
    cart: null,
  };

  it('delete success', async () => {
    Users.findOne = jest.fn().mockResolvedValueOnce(mockUserWithCart);
    await request(app)
      .delete(`${baseRoute}/${defaultProductID}`)
      .set('Authorization', defaultUserID)
      .expect(200);
  });

  it('error mongo', async () => {
    Users.findOne = jest.fn().mockImplementationOnce(() => {
      throw new Error(ECommons.DefaultError);
    });
    const res = await request(app)
      .delete(`${baseRoute}/${defaultProductID}`)
      .set('Authorization', defaultUserID)
      .expect(400);
  });

  it('error missing userID', async () => {
    const res = await request(app)
      .delete(`${baseRoute}/${defaultProductID}`)
      .expect(400);

    expect(res.body.error).toEqual(ECommons.MissingUserID);
  });

  it('error user not found', async () => {
    Users.findOne = jest.fn().mockResolvedValueOnce(null);
    const res = await request(app)
      .delete(`${baseRoute}/${defaultProductID}`)
      .set('Authorization', defaultUserID)
      .expect(400);

    expect(res.body.error).toEqual(ECommons.NotFoundUser);
  });

  it('success user with cart', async () => {
    Users.findOne = jest.fn().mockResolvedValueOnce(mockUserWithCart);
    const res = await request(app)
      .delete(`${baseRoute}/${defaultProductID}`)
      .set('Authorization', defaultUserID)
      .expect(200);

    expect(res.body.data).toMatchObject(mockUserWithEmptyCart);
  });

  it('success user with null cart', async () => {
    Users.findOne = jest.fn().mockResolvedValueOnce(mockUserWithNullCart);
    const res = await request(app)
      .delete(`${baseRoute}/${defaultProductID}`)
      .set('Authorization', defaultUserID)
      .expect(200);

    expect(res.body.data).toMatchObject(mockUserWithNullCart);
  });

  it('success user with cart not contain productID', async () => {
    Users.findOne = jest.fn().mockResolvedValueOnce(mockUserWithCart);
    const res = await request(app)
      .delete(`${baseRoute}/${defaultProductID2}`)
      .set('Authorization', defaultUserID)
      .expect(200);

    expect(res.body.data).toMatchObject(mockUserWithCart);
  });
});
