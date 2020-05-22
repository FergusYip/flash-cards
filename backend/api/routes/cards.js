const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/check-auth");

const CardsController = require("../controllers/cards");

router.get("/", CardsController.getAllCardsController);

router.post("/", checkAuth, CardsController.createCardController);

router.get("/:cardId", checkAuth, CardsController.getCardController);

router.put(
  "/:cardId/set_prompt",
  checkAuth,
  CardsController.setCardPromptController
);

router.put(
  "/:cardId/set_answer",
  checkAuth,
  CardsController.setCardAnswerController
);

module.exports = router;
