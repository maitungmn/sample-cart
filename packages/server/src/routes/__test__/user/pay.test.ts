import request from 'supertest';
import { baseUserPayRoute } from '../../user';
import { app } from '../../../app';
import { ECommons } from '../../../commons';
import { Users } from '../../../models';

describe('Test packages/server/src/routes/user/pay.ts', () => {
  const mockBody = {
    name: 'User Test',
    address: 'Address Test',
    phone: '12345678',
    email: 'test@test.com',
  };
  const defaultUserID = '9237c733-230e-46b1-8e05-a4739538cc50';
  const mockFoundUser = {
    cart: [],
    userID: defaultUserID,
    version: 0,
  };

  it('error missing userID', async () => {
    const res = await request(app)
      .post(baseUserPayRoute)
      .send(mockBody)
      .expect(400);

    expect(res.body.error).toEqual(ECommons.MissingUserID);
  });

  it('error invalid body', async () => {
    const res = await request(app)
      .post(baseUserPayRoute)
      .set('Authorization', defaultUserID)
      .send({})
      .expect(400);

    expect(res.body.error).toEqual(ECommons.InvalidBody);
  });

  it('error user not found', async () => {
    Users.findOneAndUpdate = jest.fn().mockResolvedValueOnce(null);
    const res = await request(app)
      .post(baseUserPayRoute)
      .send(mockBody)
      .set('Authorization', defaultUserID)
      .expect(400);

    expect(res.body.error).toEqual(ECommons.NotFoundUser);
  });

  it('success user found', async () => {
    Users.findOneAndUpdate = jest.fn().mockResolvedValueOnce(mockFoundUser);
    const res = await request(app)
      .post(baseUserPayRoute)
      .set('Authorization', defaultUserID)
      .send(mockBody)
      .expect(200);

    expect(res.body.data).toMatchObject(mockFoundUser);
  });

  it('error mongo', async () => {
    Users.findOneAndUpdate = jest.fn().mockImplementationOnce(() => {
      throw new Error(ECommons.DefaultError);
    });
    const res = await request(app)
      .post(baseUserPayRoute)
      .set('Authorization', defaultUserID)
      .send(mockBody)
      .expect(400);

    expect(res.body.error).toEqual(ECommons.DefaultError);
  });
});
