import request from 'supertest';
import { Types } from 'mongoose';
import { app } from '../../app';
import * as FetchDashboard from '../fetchDashboard';
import { Categories } from '../../models';
import { ECommons } from '../../commons';

const {
  baseFetchDashBoardRoute, convertCate, fetchCate, fetchProducts,
} = FetchDashboard;

describe('Test packages/server/src/routes/fetchDashboard.ts', () => {
  it('can fetch dashboard', async () => {
    await request(app)
      .get(baseFetchDashBoardRoute)
      .send()
      .expect(200);
  });

  it('fetch dashboard with one categories', async () => {
    Categories.find = jest.fn().mockResolvedValue([
      {
        title: 'Category  1',
        id: '60431ccf2d1807f27e57e566',
      },
    ]);

    const res = await request(app)
      .get(baseFetchDashBoardRoute)
      .expect(200);

    expect(res.body.data.categories.length).toBeGreaterThan(0);
  });

  it('test fetchCate', async () => {
    const res = await fetchCate();

    expect(res).toBeDefined();
  });

  it('test fetchProducts', async () => {
    const res = await fetchProducts([new Types.ObjectId()]);

    expect(res).toBeDefined();
  });

  it('test fetchProducts with empty ids', async () => {
    const res = await fetchProducts([]);

    expect(res).toEqual([]);
  });

  it('test convertCate', async () => {
    const res = await convertCate([{ id: '123', title: 'title1', productIDs: [new Types.ObjectId()] }]);

    expect(res[0]).toHaveProperty('id');
    expect(res[0]).toHaveProperty('title');
  });

  it('catch error', async () => {
    const jwtSpy = jest.spyOn(Categories, 'find');
    jwtSpy.mockImplementationOnce(() => {
      throw new Error(ECommons.DefaultError);
    });

    const res = await request(app)
      .get(baseFetchDashBoardRoute);

    expect(res.status).not.toEqual(200);
  });
});
