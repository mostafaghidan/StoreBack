import bcrypt from 'bcrypt';
import Client from '../database';
import { generateToken } from '../middleware/verifyToken';
import { userWithToken } from './Users';
export class Login {
  async auth(
    username: string,
    password: string
  ): Promise<userWithToken | null> {
    try {
      const conn = await Client.connect();
      const sql = 'select * from users where username=$1';
      const result = await conn.query(sql, [username]);
      const user = result.rows[0];
      conn.release();
      if (
        result.rows.length > 0 &&
        bcrypt.compareSync(password + process.env.PASS_SEC, user.password)
      ) {
        const token = generateToken(user);
        const userWithToken = { user, token };
        return userWithToken;
      } else {
        return null;
      }
    } catch (err) {
      throw new Error(`can not log in, ${err}`);
    }
  }
}
