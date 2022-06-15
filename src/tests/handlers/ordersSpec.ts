import supertest from 'supertest';
import app from '../../index';
const token = process.env.token;
describe('order route', () => {
  it('shoud update order status', async () => {
    const response = await supertest(app)
      .put('/api/orders/1')
      .send({
        name: 'milk',
        price: 15
      })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toEqual(201);
  });
  it('shoud get orders', async () => {
    const response = await supertest(app)
      .get('/api/orders')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toEqual(201);
  });
  it('shoud get user orders', async () => {
    const response = await supertest(app)
      .get('/api/orders/2')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toEqual(201);
  });
  it('shoud fill products to order', async () => {
    const response = await supertest(app)
      .post('/api/orders/1/fill')
      .send({
        product_id: 2,
        quantity: 10
      })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toEqual(201);
  });
  it('shoud get order products', async () => {
    const response = await supertest(app)
      .get('/api/orders/1/products')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toEqual(201);
  });
  it('shoud delete order', async () => {
    const response = await supertest(app)
      .delete('/api/orders/1')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toEqual(201);
  });
});
