const express = require("express");
const router = express.Router();

const UserController = require("../controllers/user");

router.get("/:userId", UserController.getDetailsController);

router.put("/:userId/set_email", UserController.setEmailController);

router.put("/:userId/set_name", UserController.setNameController);

router.delete("/:userId", UserController.deleteUserController);

// router.get("/:userId", UserController.user_get_details);

// router.put("/:userId/set_email", UserController.user_set_email);

// router.put("/:userId/set_name", UserController.user_set_name);

// router.delete("/:userId", UserController.user_delete);

module.exports = router;
