const express = require("express");
const router = express.Router();

const checkAuth = require("../auth/check-auth");

const StacksController = require("../controllers/stacks");

router.get("/all", StacksController.getAllStacksController);

router.get("/", checkAuth, StacksController.getUserStacksController);

router.post("/", checkAuth, StacksController.createStackController);

router.get("/:stackId", checkAuth, StacksController.getStackController);

router.patch("/:stackId", checkAuth, StacksController.stacks_patch_stack);

// router.delete("/:stackId", checkAuth, StacksController.stacks_delete_stack);

router.delete("/:stackId", checkAuth, StacksController.stacks_safe_delete);

router.post("/:stackId/add", checkAuth, StacksController.stacks_add_card);

router.delete(
  "/:stackID/remove",
  checkAuth,
  StacksController.stacks_remove_card
);

router.post("/:stackId/add_many", checkAuth, StacksController.stacks_add_cards);

module.exports = router;
