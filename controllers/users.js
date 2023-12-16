import bcrypt from "bcrypt";
import User from "../models/User.js";
import ExpressError from "../util/express-error.js";

const usersController = {
  async signIn(req, res) {
    const { username, password } = req.body;
    const foundUser = User.findOne(username);

    const passwordsMatch = await bcrypt.compare(password, foundUser.password);
    if (passwordsMatch) {
      req.session.userId = foundUser.id;
      res.status(200).send({ message: "You are now logged in." });
    } else {
      throw new ExpressError(401, "Authentication failed.");
    }
  },

  signUp(req, res) {
    const { username, password } = req.body;
    const newUser = User.create(username, password);
    if (!newUser) {
      throw new ExpressError(500, "Failed to create new user.");
    } else {
      req.session.userId = foundUser.id;
      res.status(200).send({ message: "You are now logged in." });
    }
  },
};

export default usersController;
