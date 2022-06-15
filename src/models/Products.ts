import Client from '../database';
export type Product = {
  id: number;
  name: string;
  price: number;
};
export class ProductsCRUD {
  async index(): Promise<Product[]> {
    try {
      const conn = await Client.connect();
      const sql = 'select * from products';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get products, ${err}`);
    }
  }
  async create(name: string, price: number): Promise<Product> {
    try {
      const conn = await Client.connect();
      const sql =
        'insert into products (name,price) values ($1,$2) returning *';
      const result = await conn.query(sql, [name, price]);
      conn.release();
      const product = result.rows[0];
      return product;
    } catch (err) {
      throw new Error(`Could not create product, ${err}`);
    }
  }
  async read(id: number): Promise<Product> {
    try {
      const conn = await Client.connect();
      const sql = 'select * from products where id=$1';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not show the product, ${err}`);
    }
  }
  async update(id: number, name: string, price: number): Promise<Product> {
    try {
      const conn = await Client.connect();
      const sql =
        'update products set name = $1,price=$2 where id=$3 returning *';
      const result = await conn.query(sql, [name, price, id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not update the product, ${err}`);
    }
  }
  async delete(id: number): Promise<Product> {
    try {
      const conn = await Client.connect();
      const sql = 'delete from products where id=$1 returning *';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete the product, ${err}`);
    }
  }
}
