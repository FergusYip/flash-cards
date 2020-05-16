const express = require("express");
const router = express.Router();

const checkAuth = require("../auth/check-auth");

const StacksController = require("../controllers/stacks");

router.get("/all", StacksController.stacks_get_all);

router.get("/", checkAuth, StacksController.stacks_get_stacks);

router.post("/", checkAuth, StacksController.stacks_create_stack);

router.get("/:stackId", checkAuth, StacksController.stacks_get_stack);

router.patch("/:stackId", checkAuth, StacksController.stacks_patch_stack);

router.delete("/:stackId", checkAuth, StacksController.stacks_delete_stack);

router.post("/:stackId/add", checkAuth, StacksController.stacks_add_card);

router.delete(
  "/:stackID/remove",
  checkAuth,
  StacksController.stacks_remove_card
);

router.post("/:stackId/add_many", checkAuth, StacksController.stacks_add_cards);

module.exports = router;
