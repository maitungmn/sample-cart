import request from 'supertest';
import { app } from '../../app';
import { BaseRoute } from '../base-route';

describe('Test packages/server/src/routes/index.ts', () => {
  it('can fetch root api', async () => {
    await request(app)
      .get(BaseRoute.API)
      .send()
      .expect(200);
  });
});
