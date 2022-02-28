import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();
let config = {};

//code smell
const setConnectionCredentials = (
  user: string | undefined,
  host: string | undefined,
  password: string | undefined,
  database: string | undefined
) => {
  config = {
    user,
    host,
    password,
    database,
  };
};

if (process.env.NODE_ENV == 'development') {
  setConnectionCredentials(process.env.USER_DB, process.env.HOST_DB, process.env.PW_DB, process.env.NAME_DB);
} else {
  setConnectionCredentials(
    process.env.USER_TEST_DB,
    process.env.HOST_TEST_DB,
    process.env.PW_TEST_DB,
    process.env.NAME_TEST_DB
  );
}

export const pool = new Pool(config);

export const run = () => {
  pool
    .connect()
    .then(() => console.log('Connected to database'))
    .catch((err: string) => console.log(`error connecting to database: ${err}`));
};

export const stop = () => {
  pool
    .end()
    .then(() => console.log('Connection close'))
    .catch((err: string) => console.log(`error closing the connection: ${err}`));
};
