import express from "express";
import notes from "../controllers/notes.js";

const router = express.Router({ mergeParams: true });

router.get("/", (req, res) => notes.findAll);
router.get("/:id", (req, res) => notes.findOne);

export default router;
