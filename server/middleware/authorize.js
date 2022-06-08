const User = require("../models/user");

const authorize = async (req, res, next) => {
  try {
    if (req.user.isManager === false || null) {
      throw new Error();
    } else {
      res.status(200);
    }
    next();
  } catch {
    res.status(401).send({ error: "You Are Not Authorized For This Action." });
  }
};
module.exports = authorize;
