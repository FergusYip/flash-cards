const mongoose = require("mongoose");

const Card = require("../models/cards");
const Stack = require("../models/stacks");
const User = require("../models/user");

const stackService = require("../services/stacks");

exports.getAllStacksController = async (req, res, next) => {
  try {
    const response = await stackService.getAllStacksService();
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.getUserStacksController = async (req, res, next) => {
  const userId = req.tokenPayload.userId;

  try {
    const response = await stackService.getUserStacksService(userId);
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.createStackController = async (req, res, next) => {
  const userId = req.tokenPayload.userId;
  const name = req.body.name;

  if (!name || typeof name != "string") {
    return res.status(400).json({
      error: "Incorrect parameters",
      expected: {
        name: "string",
      },
      recieved: req.body,
    });
  }

  try {
    const response = await stackService.createStackService(userId, name);
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.getStackController = async (req, res, next) => {
  const stackId = req.params.stackId;

  try {
    const response = await stackService.getStackService(stackId);
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.setStackNameController = async (req, res, next) => {
  const stackId = req.params.stackId;
  const name = req.body.name;

  if (!name || typeof name != "string") {
    return res.status(400).json({
      error: "Incorrect parameters",
      expected: {
        name: "string",
      },
      recieved: req.body,
    });
  }

  try {
    const response = await stackService.setStackNameService(stackId, name);
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.deleteStackSafeController = async (req, res, next) => {
  const stackId = req.params.stackId;
  const userId = req.tokenPayload.userId;

  try {
    const response = await stackService.deleteStackSafeService(userId, stackId);
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.addCardController = async (req, res, next) => {
  const stackId = req.params.stackId;
  const cardId = req.body.cardId;

  if (!cardId || typeof cardId != "string") {
    return res.status(400).json({
      error: "Incorrect parameters",
      expected: {
        cardId: "string",
      },
      recieved: req.body,
    });
  }

  try {
    const response = await stackService.addCardService(stackId, cardId);
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.addCardsController = async (req, res, next) => {
  const stackId = req.params.stackId;
  const cardIds = req.body.cardIds;

  if (!cardIds || typeof cardIds != "object") {
    return res.status(400).json({
      error: "Incorrect parameters",
      expected: {
        cardIds: "array",
      },
      recieved: req.body,
    });
  }

  try {
    const response = await stackService.addCardsService(stackId, cardIds);
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.removeCardController = async (req, res, next) => {
  const stackId = req.params.stackId;
  const cardId = req.body.cardId;

  try {
    const response = await stackService.removeCardService(stackId, cardId);
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.removeCardsController = async (req, res, next) => {
  const stackId = req.params.stackId;
  const cardIds = req.body.stackId;

  if (!cardIds || typeof cardIds != "array") {
    return res.status(400).json({
      error: "Incorrect parameters",
      expected: {
        cardIds: "array",
      },
      recieved: req.body,
    });
  }

  try {
    const response = await stackService.removeCardsService(stackId, cardIds);
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: err.message,
    });
  }
};
