import supertest from 'supertest';
import app from '../../index';
const token = process.env.token;
describe('user route', () => {
  it('shoud create user', async () => {
    const response = await supertest(app)
      .post('/api/users/register')
      .send({
        username: 'aaa',
        email: 'aaa',
        password: '123456'
      })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(201);
  });
  it('shoud update user', async () => {
    const response = await supertest(app)
      .put('/api/users/update/1')
      .send({
        username: 'bbb',
        email: 'bbb',
        password: '123456'
      })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toEqual(200);
  });
  it('shoud get users', async () => {
    const response = await supertest(app)
      .get('/api/users')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toEqual(200);
  });
  it('shoud get a user', async () => {
    const response = await supertest(app)
      .get('/api/users/get/1')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toEqual(200);
  });
  it('shoud delete user', async () => {
    const response = await supertest(app)
      .delete('/api/users/delet/1')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toEqual(404);
  });
});
