import Note from "../models/Note.js";
import ExpressError from "../util/express-error.js";

const notesController = {
  findOne(req, res) {
    const { id } = req.params;
    const foundNote = Note.findOne(id);
    return foundNote;
  },
  findAll(req, res) {
    const { userId } = req.session;
    const userNotes = Note.findAll(userId);
    if (!userNotes) {
      throw new ExpressError(
        404,
        "The notes for this user could not be located."
      );
    } else {
      res.status(200).send({ userNotes });
    }
  },
};

export default notesController;
