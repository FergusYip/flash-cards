const express = require("express");
const router = express.Router();

const UserController = require("../controllers/user");

router.get("/:userId", UserController.getDetailsController);

router.put("/:userId/set_email", UserController.setEmailController);

router.put("/:userId/set_name", UserController.setNameController);

router.delete("/:userId", UserController.deleteUserController);

module.exports = router;
