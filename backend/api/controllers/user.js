const User = require("../models/user");

const userService = require("../services/user");

exports.getDetailsController = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const response = await userService.getDetailsService(userId);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.setEmailController = async (req, res, next) => {
  const userId = req.params.userId;
  const { email } = req.body;

  try {
    const response = await userService.setEmailService(userId, email);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.setNameController = async (req, res, next) => {
  const userId = req.params.userId;
  const { name } = req.body;

  try {
    const response = await userService.setNameService(userId, name);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.deleteUserController = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    const response = await userService.deleteUserService(userId);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.user_get_details = (req, res, next) => {
  const userId = req.params.userId;
  User.findById(userId)
    .exec()
    .then((user) => {
      if (user) {
        res.status(200).json({
          message: "Successfully obtained user details",
          user: {
            userId: user._id,
            name: user.name,
            email: user.email,
          },
        });
      } else {
        res.status(404).json({
          message: "No valid entry found for provided ID.",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.user_set_email = (req, res, next) => {
  const userId = req.params.userId;
  const newEmail = req.body.email;
  User.findByIdAndUpdate(
    userId,
    {
      $set: { email: newEmail },
    },
    { new: true }
  )
    .exec()
    .then((user) => {
      const userDetails = {
        userId: user._id,
        name: user.name,
        email: user.email,
      };
      if (user) {
        // if (user.email == newEmail) {
        //   return res.status(400).json({
        //     message: "New email is the same as the current email",
        //     user: userDetails,
        //   });
        // }
        return res.status(200).json({
          message: "Successfully updated email",
          user: userDetails,
        });
      } else {
        return res.status(404).json({
          message: "No valid entry found for provided ID.",
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
      });
    });
};

exports.user_set_name = (req, res, next) => {
  const userId = req.params.userId;
  const newName = req.body.name;
  User.findByIdAndUpdate(
    userId,
    {
      $set: { name: newName },
    },
    { new: true }
  )
    .exec()
    .then((user) => {
      const userDetails = {
        userId: user._id,
        name: user.name,
        email: user.email,
      };
      if (user) {
        // if (user.name == newName) {
        //   return res.status(400).json({
        //     message: "New name is the same as the current name",
        //     user: userDetails,
        //   });
        // }
        return res.status(200).json({
          message: "Successfully updated name",
          user: userDetails,
        });
      } else {
        return res.status(404).json({
          message: "No valid entry found for provided ID.",
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
      });
    });
};

exports.user_delete = (req, res, next) => {
  const userId = req.params.userId;
  User.findByIdAndRemove(userId)
    .exec()
    .then((result) => {
      if (!result) {
        res.status(404).json({
          message: "No valid entry found for provided ID.",
        });
      } else {
        res.status(200).json({
          message: "Successfully removed user",
          // user: result,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
