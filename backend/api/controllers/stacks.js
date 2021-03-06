const stackService = require("../services/stacks");

exports.getAllStacksController = async (req, res, next) => {
  try {
    const response = await stackService.getAllStacksService();
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

exports.getUserStacksController = async (req, res, next) => {
  const userId = req.tokenPayload.userId;

  try {
    const response = await stackService.getUserStacksService(userId);
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

exports.createStackController = async (req, res, next) => {
  const userId = req.tokenPayload.userId;
  const name = req.body.name;

  try {
    const response = await stackService.createStackService(userId, name);
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

exports.getStackController = async (req, res, next) => {
  const stackId = req.params.stackId;

  try {
    const response = await stackService.getStackService(stackId);
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

exports.setStackNameController = async (req, res, next) => {
  const stackId = req.params.stackId;
  const name = req.body.name;

  try {
    const response = await stackService.setStackNameService(stackId, name);
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

exports.deleteStackSafeController = async (req, res, next) => {
  const stackId = req.params.stackId;
  const userId = req.tokenPayload.userId;

  try {
    const response = await stackService.deleteStackSafeService(userId, stackId);
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

exports.deleteUnsafeController = async (req, res, next) => {
  const stackId = req.params.stackId;

  try {
    const response = await stackService.deleteUnsafeService(stackId);
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

exports.addCardController = async (req, res, next) => {
  const stackId = req.params.stackId;
  const cardId = req.body.cardId;

  try {
    const response = await stackService.addCardService(stackId, cardId);
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

exports.addCardsController = async (req, res, next) => {
  const stackId = req.params.stackId;
  const cardIds = req.body.cardIds;

  try {
    const response = await stackService.addCardsService(stackId, cardIds);
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

exports.removeCardController = async (req, res, next) => {
  const stackId = req.params.stackId;
  const cardId = req.body.cardId;

  try {
    const response = await stackService.removeCardService(stackId, cardId);
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

exports.removeCardsController = async (req, res, next) => {
  const stackId = req.params.stackId;
  const cardIds = req.body.stackId;

  try {
    const response = await stackService.removeCardsService(stackId, cardIds);
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};
