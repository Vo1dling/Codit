const express = require("express");
const {
  postUser,
  login,
  logout,
  logoutAll,
  viewProfile,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
} = require("../controllers/user.controllers");
const authenticate = require("../../middleware/authenticate");
const authorize = require("../../middleware/authorize");
const router = new express.Router();

router.post("/users", postUser);

router.post("/users/login", login);

router.post("/users/logout", authenticate, logout);

router.post("/users/logoutAll", authenticate, logoutAll);

router.get("/users/me", authenticate, viewProfile);

router.get("/users/:id", getUser);

router.get("/users/", getUsers);

router.put("/users/:id", authenticate, updateUser);

router.delete("/users/:id", authenticate, deleteUser);

module.exports = router;
