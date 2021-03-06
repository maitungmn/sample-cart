import request from 'supertest';
import { app } from '../../app';
import { baseAPI } from '../base-route';

describe('Test packages/server/src/routes/index.ts', () => {
  it('can fetch root api', async () => {
    await request(app)
      .get(baseAPI)
      .send()
      .expect(200);
  });
});
