import session from "express-session";
import MySQLStore from "express-mysql-session";

const SessionStore = MySQLStore(session);

export function configSession() {
  const store = new SessionStore({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  return session({
    secret: process.env.SESSION_SECRET,
    store: store,
    saveUninitialized: false,
    resave: false,
  });
}
