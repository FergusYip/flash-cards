const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/auth");

router.post("/register", AuthController.registerController);

router.post("/login", AuthController.loginController);

router.post("/refresh", AuthController.refreshAccessController);

module.exports = router;
