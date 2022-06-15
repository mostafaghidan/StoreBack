import supertest from 'supertest';
import app from '../../index';
const token = process.env.token;
describe('product route', () => {
  it('shoud create product', async () => {
    const response = await supertest(app)
      .post('/api/products/create')
      .send({
        name: 'milk',
        price: 10
      })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(201);
  });
  it('shoud update product', async () => {
    const response = await supertest(app)
      .put('/api/products/update/1')
      .send({
        name: 'milk',
        price: 15
      })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toEqual(200);
  });
  it('shoud get products', async () => {
    const response = await supertest(app)
      .get('/api/products')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toEqual(200);
  });
  it('shoud get a product', async () => {
    const response = await supertest(app)
      .get('/api/products/get/1')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toEqual(200);
  });
  it('shoud delete product', async () => {
    const response = await supertest(app)
      .delete('/api/products/delete/1')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toEqual(200);
  });
});
