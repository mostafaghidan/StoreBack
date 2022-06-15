import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();
const {
  PGHOST,
  PGPORT,
  PGDATABASE_DEV,
  PGDATABASE_TEST,
  PGUSER,
  PGPASSWORD,
  ENV
} = process.env;
let Client = new Pool({
  host: PGHOST,
  port: PGPORT as unknown as number,
  database: PGDATABASE_DEV,
  user: PGUSER,
  password: PGPASSWORD
});
if (ENV === 'dev') {
  Client = new Pool({
    host: PGHOST,
    port: PGPORT as unknown as number,
    database: PGDATABASE_DEV,
    user: PGUSER,
    password: PGPASSWORD
  });
}
if (ENV === 'test') {
  Client = new Pool({
    host: PGHOST,
    port: PGPORT as unknown as number,
    database: PGDATABASE_TEST,
    user: PGUSER,
    password: PGPASSWORD
  });
}
export default Client;
