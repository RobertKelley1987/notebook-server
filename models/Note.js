import db from "../db/index.js";
import { v4 as uuid } from "uuid";
import moment from "moment";

class Note {
  constructor(db) {
    this.db = db;
  }

  async create(title, content, userId, categoryIds) {
    const noteId = uuid(); // id of new note
    const updatedAt = moment().format("YYYY-MM-DD HH:mm:ss");

    // Insert note into db
    const [rows] = await this.db.query(
      "INSERT INTO notes (id, title, content, user_id, updated_at) VALUES (?, ?, ?, ?, ?)",
      [noteId, title, content, userId, updatedAt]
    );

    if (!rows.affectedRows) {
      throw new Error("Failed to create new note.");
    }

    // If category ids were provided, add category-note connection to db
    if (categoryIds && categoryIds.length > 0) {
      categoryIds.forEach((categoryId) =>
        this.db.query(
          "INSERT INTO category_notes (category_id, note_id) VALUES (?, ?)",
          [categoryId, noteId]
        )
      );
    }

    // Return new note
    return this.findById(noteId);
  }

  async updateOne(noteId, title, content) {
    const updatedAt = moment().format("YYYY-MM-DD HH:mm:ss");

    // Insert note into db
    const [rows] = await this.db.query(
      "UPDATE notes SET title=?, content=?, updated_at=? WHERE id=?",
      [title, content, updatedAt, noteId]
    );

    if (!rows.affectedRows) {
      throw new Error("Failed to update note.");
    }

    // Return new note
    return this.findById(noteId);
  }

  async findAll(userId) {
    const [rows] = await this.db.query("SELECT * FROM notes WHERE user_id=?", [
      userId,
    ]);
    if (!rows) {
      throw new ExpressError(
        404,
        "The notes for this user could not be located."
      );
    }
    return rows;
  }

  async findById(noteId) {
    const [rows] = await this.db.query("SELECT * FROM notes WHERE id=?", [
      noteId,
    ]);

    if (!rows[0]) {
      throw new ExpressError(404, "The note you requested could not be found.");
    }

    return rows[0];
  }

  async deleteOne(noteId) {
    const [rows] = await this.db.query("DELETE FROM notes WHERE id=?", [
      noteId,
    ]);

    if (!rows.affectedRows) {
      throw new Error("Failed to delete note.");
    }

    return 1;
  }
}

export default new Note(db);
