const cardService = require("../services/card");

exports.getAllCardsController = async (req, res, next) => {
  try {
    const response = await cardService.getAllCardsService();
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

exports.createCardController = async (req, res, next) => {
  const userId = req.tokenPayload.userId;
  const { prompt, answer, stackId } = req.body;

  try {
    const response = await cardService.createCardService(
      userId,
      prompt,
      answer,
      stackId
    );
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

exports.getCardController = async (req, res, next) => {
  const cardId = req.params.cardId;
  try {
    const response = await cardService.getCardService(cardId);
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

exports.setCardPromptController = async (req, res, next) => {
  const cardId = req.params.cardId;
  const prompt = req.body.prompt;

  try {
    const response = await cardService.setCardPromptService(cardId, prompt);
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

exports.setCardAnswerController = async (req, res, next) => {
  const cardId = req.params.cardId;
  const answer = req.body.answer;

  try {
    const response = await cardService.setCardAnswerService(cardId, answer);
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};
