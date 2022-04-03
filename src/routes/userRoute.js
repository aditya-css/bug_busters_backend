const express = require("express");
const userController = require("../controller/userController");
const router = express.Router();
//register users
router.post(
    "/register",
    userController.createUser
);
// login users
router.post("/login", userController.loginUser);
module.exports = router;