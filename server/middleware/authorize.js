const authorize = async (req, res, next) => {
  try {
    console.log(req.user);
    if (req.user.isManager === false) {
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
