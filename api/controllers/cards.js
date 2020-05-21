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

exports.createCardService = async (req, res, next) => {
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
    const response = await cardService.createCardsService(
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

exports.cards_create_card = (req, res, next) => {
  const userId = req.tokenPayload.userId;
  const { prompt, answer } = req.body;
  let stackId = req.body.stackId;

  User.findById(userId)
    .exec()
    .then((user) => {
      const card = new Card({
        _id: new mongoose.Types.ObjectId(),
        prompt: prompt,
        answer: answer,
      });

      if (stackId == null) {
        console.log("stackId is null");
        stackId = user.defaultStack;
      }
      console.log(stackId);
      return Promise.all([
        card.save(),
        Stack.findByIdAndUpdate(
          stackId,
          { $addToSet: { cards: card } },
          { new: true }
        )
          .select("cards _id name")
          .exec(),
      ]);
    })
    .then((result) => {
      const [card, stack] = result;
      if (stack == null) {
        console.log("after promise: stack is null");
      }
      return res.status(200).json({
        message: "Created new card successfully",
        card: {
          cardId: card._id,
          prompt: card.prompt,
          answer: card.answer,
        },
        stack: stack.transform(),
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        error: err,
      });
    });
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

exports.cards_get_card = (req, res, next) => {
  const id = req.params.cardId;

  Card.findById(id)
    .exec()
    .then((doc) => {
      console.log(doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({
          message: "No valid entry found for provided ID.",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
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

exports.cards_patch_card = (req, res, next) => {
  const id = req.params.cardId;
  const updateOps = {};
  for (const ops of req.body) {
    console.log(ops);
    updateOps[ops.propName] = ops.value;
  }
  console.log(updateOps);
  Card.updateOne(
    { _id: id },
    {
      $set: updateOps,
    }
  )
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.cards_delete_card = (req, res, next) => {
  const id = req.params.cardId;

  Card.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
