const express = require("express");
const router = express.Router();

const checkAuth = require("../auth/check-auth");

const StacksController = require("../controllers/stacks");

router.get("/all", StacksController.getAllStacksController);

router.get("/", checkAuth, StacksController.getUserStacksController);

router.post("/", checkAuth, StacksController.createStackController);

router.get("/:stackId", checkAuth, StacksController.getStackController);

router.put("/:stackId", checkAuth, StacksController.setStackNameController);

// router.delete("/:stackId", checkAuth, StacksController.stacks_delete_stack);

router.delete(
  "/:stackId",
  checkAuth,
  StacksController.deleteStackSafeController
);

router.post(
  "/:stackId/add",
  checkAuth,
  StacksController.addCardToStackController
);

router.delete(
  "/:stackID/remove",
  checkAuth,
  StacksController.stacks_remove_card
);

router.post("/:stackId/add_many", checkAuth, StacksController.stacks_add_cards);

module.exports = router;
