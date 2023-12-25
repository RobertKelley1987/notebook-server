import express from "express";
import notes from "../controllers/notes.js";

const router = express.Router({ mergeParams: true });

router.get("/", notes.findAll);
router.get("/:id", notes.findOne);

export default router;
