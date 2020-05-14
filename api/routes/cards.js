const express = require("express");
const router = express.Router();

const checkAuth = require("../auth/check-auth");

const CardsController = require("../controllers/cards");

router.get("/", CardsController.cards_get_all);

router.post("/", checkAuth, CardsController.cards_create_card);

router.get("/:cardId", checkAuth, CardsController.cards_get_card);

router.patch("/:cardId", checkAuth, CardsController.cards_patch_card);

router.delete("/:cardId", checkAuth, CardsController.cards_delete_card);

module.exports = router;
