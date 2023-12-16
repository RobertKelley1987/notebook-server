import db from "../db/index.js";
import { v4 as uuid } from "uuid";

class Note {
  constructor(db) {
    this.db = db;
  }

  create(title, content, userId, categoryIds) {
    const noteId = uuid(); // id of new note

    // Insert note into db
    this.db.query(
      "INSERT INTO notes (id, title, content, user_id) VALUES (?, ?, ?)",
      [noteId, title, content, userId]
    );

    // If category ids were provided, add category-note connection to db
    if (categoryIds.length > 0) {
      categoryIds.forEach((categoryId) =>
        this.db.query(
          "INSERT INTO category_notes (category_id, note_id) VALUES (?, ?)",
          [categoryId, noteId]
        )
      );
    }

    // Return new note
    return this.findOne(noteId);
  }

  findAll(userId) {
    const [rows] = this.db.query("SELECT * FROM notes WHERE user_id = ?", [
      userId,
    ]);
    return rows;
  }

  findOne(id) {
    const [rows] = this.db.query("SELECT * FROM notes WHERE id = ?", [id]);
    return rows;
  }
}

export default new Note(db);
