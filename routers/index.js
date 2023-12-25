import express from "express";
import users from "../controllers/users.js";

const router = express.Router({ mergeParams: true });

router.post("/signin", users.signIn);
router.post("/signup", users.signUp);
router.post("/signout", users.signOut);
router.get("/sessions", users.getSession);

export default router;
