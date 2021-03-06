import request from 'supertest';
import { app } from '../../../app';
import { baseFetchProductsByCateIDRoute } from '../../products/fetchProductByCateId';
import { Categories } from '../../../models';
import { ECommons } from '../../../commons';
import { baseAPI, BaseRoute } from '../../base-route';

describe('Test packages/server/src/routes/fetchProductByCateId.ts', () => {
  const route = baseAPI + BaseRoute.Products;
  const mockCateId = '60431ccf2d1807f27e57e566';
  const mockFoundCate = {
    productIDs: [
      '60431ccf2d1807f27e57e548',
      '60431ccf2d1807f27e57e549',
    ],
    _id: '60431ccf2d1807f27e57e566',
    title: 'Category  1',
    version: 0,
  };

  const mockFoundCateEmptyProd = {
    _id: '60431ccf2d1807f27e57e566',
    title: 'Category  1',
    version: 0,
  };

  it(`can fetch ${baseFetchProductsByCateIDRoute} api`, async () => {
    await request(app)
      .get(`${route}/${mockCateId}`)
      .expect(200);
  });

  it(`can fetch ${baseFetchProductsByCateIDRoute} api with result`, async () => {
    Categories.findById = jest.fn().mockResolvedValue(mockFoundCate);

    const res = await request(app)
      .get(`${route}/${mockCateId}`)
      .expect(200);

    expect(res.body.data).toBeDefined();
  });

  it(`can fetch ${baseFetchProductsByCateIDRoute} api with result empty products`, async () => {
    Categories.findById = jest.fn().mockResolvedValue(mockFoundCateEmptyProd);

    const res = await request(app)
      .get(`${route}/${mockCateId}`)
      .expect(200);

    expect(res.body.data).toBeDefined();
  });

  it('got empty cate', async () => {
    const res = await request(app)
      .get(`${route}/${mockCateId}`);

    expect(res.status).toEqual(200);
    expect(res.body.data).toEqual([]);
  });

  it('got error', async () => {
    const jwtSpy = jest.spyOn(Categories, 'findById');
    jwtSpy.mockImplementationOnce(() => {
      throw new Error(ECommons.DefaultError);
    });

    const res = await request(app)
      .get(`${route}/123`);

    expect(res.status).not.toEqual(200);
  });
});
