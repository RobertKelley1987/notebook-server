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

    const result = await this.db.query(
      "INSERT INTO users (id, username, password) VALUES(?, ?, ?)",
      [userId, username, hashedPassword]
    );

    if (result.length) {
      return this.findById(userId);
    } else {
      return { error: "Failed to create new user in db." };
    }
  }

  async findByUsername(username) {
    const [rows] = await this.db.query(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );
    return rows[0];
  }

  async findById(id) {
    const [rows] = await this.db.query("SELECT * FROM users WHERE id = ?", [
      id,
    ]);
    return rows[0];
  }
}

export default new User(db);
