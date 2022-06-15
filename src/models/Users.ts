import bcrypt from 'bcrypt';
import Client from '../database';
import { generateToken } from '../middleware/verifyToken';
export type User = {
  id: number;
  username: string;
  email: string;
  password: string;
};
export type userWithToken = {
  user: User;
  token: string;
};
export class UsersCRUD {
  async index(): Promise<User[] | null> {
    try {
      const conn = await Client.connect();
      const sql = 'select * from users';
      const result = await conn.query(sql);
      conn.release();
      const user = result.rows;
      return user;
    } catch (err) {
      return null;
    }
  }
  async create(
    username: string,
    email: string,
    password: string
  ): Promise<userWithToken | null> {
    try {
      const conn = await Client.connect();
      const sql =
        'insert into users (username,email,password) values ($1,$2,$3) returning *';
      const hashedPassword = bcrypt.hashSync(
        password + process.env.PASS_SEC,
        parseInt(process.env.SALTROUND as string)
      );
      const result = await conn.query(sql, [username, email, hashedPassword]);
      conn.release();
      const user = result.rows[0];
      const token = generateToken(user);
      const userWithToken = { user, token };
      return userWithToken;
    } catch (err) {
      return null;
    }
  }
  async read(id: number): Promise<User | null> {
    try {
      const conn = await Client.connect();
      const sql = 'select * from users where id=$1';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      return null;
    }
  }
  async update(
    id: number,
    username: string,
    email: string,
    password: string
  ): Promise<User | null> {
    try {
      const conn = await Client.connect();
      const sql =
        'update users set username = $1,email=$2, password =$3 where id=$4 returning *';
      const hashedPassword = bcrypt.hashSync(
        password + process.env.PASS_SEC,
        parseInt(process.env.SALTROUND as string)
      );
      const result = await conn.query(sql, [
        username,
        email,
        hashedPassword,
        id
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      return null;
    }
  }
  async delete(id: number): Promise<User | null> {
    try {
      const conn = await Client.connect();
      const sql = 'delete from users where id=$1 returning *';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      return null;
    }
  }
}
