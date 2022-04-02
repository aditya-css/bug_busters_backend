const express = require("express");
const userController = require("../controller/userController");
const { auth } = require("../utils/auth");
// const multer = require("multer");
const upload = require("../middleware/uploadAvator");

const router = express.Router();

//const multer = require("multer");

//register users
router.post(
  "/register",
  upload.single("avatar"),
  userController.createUserController
);
// login users
router.post("/login", userController.loginUserController);

module.exports = router;
