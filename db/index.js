import mysql from "mysql2";

// DB config used here for mysql and in session config for sql session storage
// export const dbConfig = {
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   port: process.env.DB_PORT,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
// };

// Create pool using config options
const db = mysql
  .createPool({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  })
  .promise();

// Select the schema for this app in the db
db.query("USE notebook");

export default db;
