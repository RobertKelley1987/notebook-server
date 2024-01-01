import Note from "../models/Note.js";
import ExpressError from "../util/express-error.js";

const notes = {
  async create(req, res) {
    const { userId } = req.session;
    const { title, content } = req.body;
    await Note.create(title, content, userId);
    const notes = await Note.findAll(userId);
    res.status(200).send({ notes });
  },

  async updateOne(req, res) {
    const { userId } = req.session;
    const { noteId } = req.params;
    const { title, content } = req.body;
    await Note.updateOne(noteId, title, content);
    const notes = await Note.findAll(userId);
    res.status(200).send({ notes });
  },

  async findOne(req, res) {
    const { noteId } = req.params;
    const note = await Note.findById(noteId);
    res.status(200).send({ note });
  },

  async findAll(req, res) {
    const { userId } = req.session;
    const notes = await Note.findAll(userId);
    res.status(200).send({ notes });
  },

  async delete(req, res) {
    const { userId } = req.session;
    const { noteId } = req.params;
    await Note.deleteOne(noteId);
    const notes = await Note.findAll(userId);
    res.status(200).send({ notes });
  },
};

export default notes;
