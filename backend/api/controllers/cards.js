const cardService = require("../services/card");

exports.getAllCardsController = async (req, res, next) => {
  try {
    const response = await cardService.getAllCardsService();
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.createCardController = async (req, res, next) => {
  const userId = req.tokenPayload.userId;
  const { prompt, answer, stackId } = req.body;

  if (
    ![prompt, answer].every((x) => typeof x == "string") ||
    (typeof stackId != "undefined" && typeof stackId != "string")
  ) {
    return res.status(400).json({
      error: "Incorrect parameters",
      expected: {
        prompt: "string",
        answer: "string",
        stackId: "string (optional)",
      },
      recieved: req.body,
    });
  }

  try {
    const response = await cardService.createCardService(
      userId,
      prompt,
      answer,
      stackId
    );
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.getCardController = async (req, res, next) => {
  const cardId = req.params.cardId;
  try {
    const response = await cardService.getCardService(cardId);
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.setCardPromptController = async (req, res, next) => {
  const cardId = req.params.cardId;
  const prompt = req.body.prompt;

  if (typeof prompt != "string") {
    return res.status(400).json({
      error: "Incorrect parameters",
      expected: {
        prompt: "string",
      },
      recieved: req.body,
    });
  }

  try {
    const response = await cardService.setCardPromptService(cardId, prompt);
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: err,
    });
  }
};

exports.setCardAnswerController = async (req, res, next) => {
  const cardId = req.params.cardId;
  const answer = req.body.answer;

  if (typeof answer != "string") {
    return res.status(400).json({
      error: "Incorrect parameters",
      expected: {
        answer: "string",
      },
      recieved: req.body,
    });
  }

  try {
    const response = await cardService.setCardAnswerService(cardId, answer);
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: err,
    });
  }
};
