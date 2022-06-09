const express = require("express");
const {
	postUser,
	login,
	logout,
	logoutAll,

	getUsers,
	updateUser,
	deleteUser,
} = require("../controllers/user.controllers");
const authenticate = require("../../middleware/authenticate");
const authorize = require("../../middleware/authorize");
const router = new express.Router();

router.post("/users", [authenticate, authorize], postUser);

router.post("/users/login", login);

router.post("/users/logout", authenticate, logout);

router.post("/users/logoutAll", authenticate, logoutAll);

router.get("/users/", [authenticate, authorize], getUsers);

router.put("/users/:id", [authenticate, authorize], updateUser);

router.delete("/users/:id", [authenticate, authorize], deleteUser);

module.exports = router;
