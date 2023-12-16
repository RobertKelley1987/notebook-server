import db from "../db/index.js";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";

class User {
  constructor(db) {
    this.db = db;
  }

  async create(username, password) {
    const userId = uuid();
    const hashedPassword = await bcrypt.hash(password, 12);

    const [rows] = this.db.query(
      "INSERT INTO users (id, username, password) VALUES(?, ?)",
      [userId, username, hashedPassword]
    );
    return rows;
  }

  findOne(username) {
    const [rows] = this.db.query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);
    return rows;
  }
}

export default new User(db);
