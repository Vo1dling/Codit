const User = require("../../models/user");
const jwt = require("jsonwebtoken");

const postUser = async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const genToken = await user.generateAuthToken();

    res.status(201).send({ user, genToken });
  } catch (e) {
    res.status(400).send(e.message);
  }
};
const login = async (req, res) => {
  try {
    const { token } = req.body;
    if (token) {
      jwt.verify(token, process.env.SECRET_KEY);
      const tokenUser = await User.findOne({ "tokens.token": token });
      if (!tokenUser) {
        return res.status(400).send();
      } else return res.send({ user: tokenUser });
    }

    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const genToken = await user.generateAuthToken();
    res.send({ user, genToken });
  } catch (e) {
    res.status(400).send(e.message);
  }
};
const logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
};
const logoutAll = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
};

const viewProfile = async (req, res) => {
  res.send(req.user);
};
const getUser = async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
};
const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    if (!users) {
      return res.status(404).send();
    }

    res.send(users);
  } catch (e) {
    res.status(500).send();
  }
};
const updateUser = async (req, res) => {
  const updates = Object.keys(req.body);

  try {
    const user = await User.findById(req.params.id);

    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
};
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
};
module.exports = {
  postUser,
  login,
  logout,
  logoutAll,
  viewProfile,
  getUser,
  updateUser,
  deleteUser,
  getUsers,
};
