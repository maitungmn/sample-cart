export const baseAPI = process.env.APP_BASE_ROUTE || '/api/v1';

export enum BaseRoute {
  Docs = '/api-docs',
  Seed = '/seed',
  Dashboard = '/dashboard',
  Products = '/products',
  Payment = '/pay',
}
