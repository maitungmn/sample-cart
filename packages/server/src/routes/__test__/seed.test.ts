import request from 'supertest';
import { baseSeedAPI, categoriesSeedData, productsSeedData } from '../seed';
import { app } from '../../app';
import { Categories } from '../../models/categories';
import { ECommons } from '../../commons';

describe('Test packages/server/src/routes/seed.ts', () => {
  it('test productsSeedData', () => {
    const result = productsSeedData();

    expect(result.length).toEqual(30);
    expect(result[0]).toHaveProperty('name');
    expect(result[0]).toHaveProperty('imageUrl');
    expect(result[0]).toHaveProperty('price');
  });

  it('test categoriesSeedData', () => {
    const productResults = productsSeedData();

    const cateResults = categoriesSeedData(productResults);

    expect(cateResults.length).toEqual(3);
    expect(cateResults[0]).toHaveProperty('title');
    expect(cateResults[0]).toHaveProperty('productIDs');
  });

  it('test categoriesSeedData return empty array', () => {
    const cateResults = categoriesSeedData([]);

    expect(cateResults.length).toEqual(0);
  });

  it('test baseSeedAPI return status 200', async () => {
    const response = await request(app)
      .post(baseSeedAPI)
      .send({});

    expect(response.body).toMatchObject({ message: 'Done!' });
    expect(response.status).toEqual(200);
  });

  it('test baseSeedAPI throw error', async () => {
    const jwtSpy = jest.spyOn(Categories, 'insertMany');
    jwtSpy.mockImplementationOnce(() => {
      throw new Error(ECommons.DefaultError);
    });

    const res = await request(app)
      .post(baseSeedAPI)
      .send({});
    expect(res.status).not.toEqual(200);
  });
});
