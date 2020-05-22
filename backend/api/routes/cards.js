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

// router.patch("/:cardId", checkAuth, CardsController.cards_patch_card);

// router.delete("/:cardId", checkAuth, CardsController.cards_delete_card);

module.exports = router;
