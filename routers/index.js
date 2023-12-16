import express from "express";
import users from "../controllers/users.js";

const router = express.Router({ mergeParams: true });

router.post("/signin", (req, res) => users.signIn);
router.post("/signup", (req, res) => users.signUp);

export default router;
