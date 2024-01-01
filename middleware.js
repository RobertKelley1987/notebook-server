import ExpressError from "./util/express-error.js";

export function isLoggedIn(req, res, next) {
  if (req.session.userId) {
    next();
  } else {
    throw new ExpressError(401, "You must be logged in to access this route.");
  }
}
