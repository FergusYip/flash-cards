const authService = require("../services/auth");

exports.registerController = async (req, res, next) => {
  const { email, password, name } = req.body;

  const input = [email, password, name];
  const inputTypes = input.map((element) => typeof element);

  if (
    inputTypes.some((x) => x == "undefined") ||
    !inputTypes.every((x) => x == "string")
  ) {
    return res.status(400).json({
      error: "Incorrect parameters",
      expected: {
        email: "string",
        password: "string",
        name: "string",
      },
      recieved: req.body,
    });
  }

  try {
    const response = await authService.registerService(email, password, name);
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.loginController = async (req, res, next) => {
  const { email, password } = req.body;
  const input = [email, password];
  const inputTypes = input.map((x) => typeof x);

  if (
    inputTypes.some((x) => x == "undefined") ||
    !inputTypes.every((x) => x == "string")
  ) {
    return res.status(400).json({
      error: "Incorrect parameters",
      expected: {
        email: "string",
        password: "string",
      },
      recieved: req.body,
    });
  }

  try {
    const response = await authService.authenticateService(email, password);
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.refreshAccessController = async (req, res, next) => {
  const refreshToken = req.body.refreshToken;

  if (typeof refreshToken != "string") {
    return res.status(400).json({
      error: "Incorrect parameters",
      expected: {
        refreshToken: "string",
      },
      recieved: req.body,
    });
  }

  try {
    const response = await authService.refreshAccessService(refreshToken);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};
