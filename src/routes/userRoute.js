const express = require("express");
const userController = require("../controller/userController");
const { auth } = require("../middleware/auth");
const router = express.Router();
//register users
router.post(
    "/register",
    userController.createUser
);
// login users
router.post("/login", userController.loginUser);
router.get("/", userController.viewUsers);
router.get("/:id", userController.viewUser);
router.put("/updateUser/:id", auth, userController.editUser);
router.put("/updateTotalRewards/:id", userController.updateTotalRewards);
router.put("/updatePublicAddress/:id", userController.updatePublicAddress);
module.exports = router;