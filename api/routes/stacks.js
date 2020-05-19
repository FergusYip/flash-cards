const express = require("express");
const router = express.Router();

const checkAuth = require("../auth/check-auth");

const StacksController = require("../controllers/stacks");

router.get("/all", StacksController.getAllStacksController);

router.get("/", checkAuth, StacksController.getUserStacksController);

router.post("/", checkAuth, StacksController.createStackController);

router.get("/:stackId", checkAuth, StacksController.getStackController);

router.put("/:stackId", checkAuth, StacksController.setStackNameController);

router.delete(
  "/:stackId",
  checkAuth,
  StacksController.deleteStackSafeController
);

router.post("/:stackId/add", checkAuth, StacksController.addCardsController);

router.post(
  "/:stackId/add_many",
  checkAuth,
  StacksController.addCardsController
);

router.delete(
  "/:stackID/remove",
  checkAuth,
  StacksController.removeCardController
);

router.post(
  "/:stackId/remove_many",
  checkAuth,
  StacksController.removeCardsController
);

module.exports = router;
