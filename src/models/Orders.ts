import Client from '../database';
export type AddProducts = {
  product_id: number;
  quantity: number;
};
export type Order = {
  id: number;
  user_id: number;
  status: boolean;
};
export type OrderWithProduct = {
  id: number;
  user_id: number;
  status: boolean;
  products: AddProducts[];
};
export class OrdersCRUD {
  async createOrder(user_id: number, status: boolean): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql =
        'insert into orders (user_id,status) values ($1,$2) returning *';
      const result = await conn.query(sql, [user_id, status]);
      conn.release();
      const order = result.rows[0];
      return order;
    } catch (err) {
      throw new Error(`can not create order, ${err}`);
    }
  }
  async updateStatus(id: number, status: boolean): Promise<Order | null> {
    try {
      const conn = await Client.connect();
      const sql = 'UPDATE orders set status = $1 where id=$2 returning *';
      const result = await conn.query(sql, [status, status]);
      conn.release();
      const order = result.rows[0];
      return order;
    } catch (err) {
      return null;
    }
  }
  async showUserOrders(user_id: number): Promise<Order[] | null> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM orders WHERE user_id =$1';
      const result = await conn.query(sql, [user_id]);
      conn.release();
      const order = result.rows;
      return order;
    } catch (err) {
      return null;
    }
  }
  async showAllOrders(): Promise<Order[] | null> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM orders';
      const result = await conn.query(sql);
      conn.release();
      const order = result.rows[0];
      return order;
    } catch (err) {
      return null;
    }
  }
  async deleteOrder(id: number): Promise<Order | null> {
    try {
      const conn = await Client.connect();
      const sql = 'DELETE FROM orders WHERE id=$1 RETURNING *';
      const result = await conn.query(sql, [id]);
      conn.release();
      const order = result.rows[0];
      return order;
    } catch (err) {
      return null;
    }
  }
  async fillingOrder(
    order_id: number,
    product_id: number,
    quantity: number
  ): Promise<OrderWithProduct | null> {
    try {
      const conn = await Client.connect();
      const sql =
        'INSERT INTO order_products (order_id,product_id,quantity) VALUES ($1,$2,$3) RETURNING *';
      const result = await conn.query(sql, [order_id, product_id, quantity]);
      conn.release();
      const orderProducts = result.rows[0];
      return orderProducts;
    } catch (err) {
      return null;
    }
  }
  async getOrderProducts(order_id: number): Promise<OrderWithProduct[] | null> {
    try {
      const conn = await Client.connect();
      const sql =
        'SELECT * FROM order_products INNER JOIN orders ON order_id = orders.id WHERE orders.id=$1';
      const result = await conn.query(sql, [order_id]);
      conn.release();
      const order = result.rows;
      return order;
    } catch (err) {
      return null;
    }
  }
}
