import bcrypt from "bcrypt";
import User from "../models/User.js";
import ExpressError from "../util/express-error.js";

const users = {
  async signIn(req, res) {
    const { username, password } = req.body;
    const foundUser = await User.findByUsername(username);

    const passwordsMatch = await bcrypt.compare(password, foundUser.password);
    if (passwordsMatch) {
      req.session.userId = foundUser.id;
      res.status(200).send({ userId: foundUser.id });
    } else {
      throw new ExpressError(401, "Authentication failed.");
    }
  },

  async signUp(req, res) {
    const { username, password } = req.body;
    const newUser = await User.create(username, password);
    if (newUser.error) {
      throw new ExpressError(500, "Failed to create new user.");
    } else {
      req.session.userId = newUser.id;
      res.status(200).send({ userId: newUser.id });
    }
  },

  signOut(req, res) {
    req.session.userId = null;
    res.status(200).send({ userId: null });
  },

  getSession(req, res) {
    res.status(200).send({ userId: req.session.userId || "" });
  },
};

export default users;
