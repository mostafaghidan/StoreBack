import { OrdersCRUD } from '../../models/Orders';
import { UsersCRUD } from '../../models/Users';
const orderTest = new OrdersCRUD();
const userTest = new UsersCRUD();

describe('Order Model', () => {
  it('shoud have a create method', () => {
    expect(orderTest.createOrder).toBeDefined();
  });
  it('shoud have an update method', () => {
    expect(orderTest.updateStatus).toBeDefined();
  });
  it('shoud have show method', () => {
    expect(orderTest.showUserOrders).toBeDefined();
  });
  it('shoud have show all or index method', () => {
    expect(orderTest.showAllOrders).toBeDefined();
  });
  it('shoud have a delete method', () => {
    expect(orderTest.deleteOrder).toBeDefined();
  });
  it('shoud have a create method', () => {
    expect(orderTest.fillingOrder).toBeDefined();
  });
  it('shoud have a index method', () => {
    expect(orderTest.getOrderProducts).toBeDefined();
  });
  it('shoud create method return a user data', async () => {
    const username = 'mostafa';
    const email = 'mostafa';
    const password = '123456';
    const result = await userTest.create(username, email, password);
    if (result !== null) {
      expect(result.user.username).toEqual('mostafa');
      expect(result.user.id).toEqual(2);
    }
  });
  it('shoud create method return an order data', async () => {
    const user_id = 2;
    const status = true;
    const result = await orderTest.createOrder(user_id, status);
    if (result !== null) {
      expect(result.id).toEqual(1);
      expect(result.user_id).toEqual(2);
      expect(result.status).toEqual(true);
    }
  });
  it('shoud update method return the updated order data', async () => {
    const id = 2;
    const status = false;
    const result = await orderTest.updateStatus(id, status);
    if (result !== null) {
      expect(result.id).toEqual(2);
      expect(result.status).toEqual(false);
    }
  });
  it('shoud create method return filled products in order', async () => {
    const order_id = 2;
    const product_id = 1;
    const quantity = 10;
    const products = [{ product_id, quantity }];
    const result = await orderTest.fillingOrder(order_id, product_id, quantity);
    if (result !== null) {
      expect(result.id).toEqual(2);
      expect(result.status).toEqual(true);
      expect(result.products).toEqual(products);
    }
  });
  it('shoud delete method return a deleted order data', async () => {
    const order_id = 1;
    const status = true;
    const result = await orderTest.deleteOrder(order_id);
    if (result !== null) {
      expect(result.id).toEqual(1);
      expect(result.status).toEqual(status);
    }
  });
});
