import express from "express";
import notes from "../controllers/notes.js";
import { isLoggedIn } from "../middleware.js";

const router = express.Router({ mergeParams: true });

router.get("/", isLoggedIn, notes.findAll);
router.post("/", isLoggedIn, notes.create);
router.get("/:noteId", isLoggedIn, notes.findOne);
router.put("/:noteId", isLoggedIn, notes.updateOne);
router.delete("/:noteId", isLoggedIn, notes.delete);

export default router;
