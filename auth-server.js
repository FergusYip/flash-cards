const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
const port = process.env.port || 4000;

app.use(express.json());

let refreshTokens = [];

app.get("/", (req, res) => {
  return res.json({
    tokens: refreshTokens,
  });
});

app.post("/token", (req, res) => {
  const refreshToken = req.body.token;
  if (!refreshToken) {
    return res.status(401);
  }
  if (!refreshToken.includes(refreshToken)) {
    return res.status(403);
  }
  jwt.verify(refreshToken, process.env.JWT_KEY, (err, payload) => {
    if (err) {
      return res.status(403);
    }
    const accessToken = jwt.sign({
      email: payload.email,
      userId: payload.userId,
    });
    res.status(200).json({ accessToken: accessToken });
  });
});

app.delete("/logout", (req, res) => {
  refreshTokens = refreshTokens.filter((token) => token != req.body.token);
  res.status(200).json({ message: "deleted token" });
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const userId = req.body.userId;
  const payload = {
    email: email,
    userId: userId,
  };
  const accessToken = jwt.sign(payload, process.env.JWT_KEY, {
    expiresIn: "15s",
  });
  const refreshToken = jwt.sign(payload, process.env.JWT_KEY);
  refreshTokens.push(refreshToken);
  res.status(200).json({
    message: "Successfully authenticated user",
    accessToken: accessToken,
    refreshToken: refreshToken,
    userId: userId,
  });

  // const email = req.body.email;
  // User.findOne({ email: email })
  //   .exec()
  //   .then((user) => {
  //     if (user) {
  //       bcrypt
  //         .compare(req.body.password, user.password)
  //         .then((result) => {
  //           if (result) {
  //             const payload = {
  //               email: email,
  //               userId: user._id,
  //             };
  //             const accessToken = jwt.sign(payload, process.env.JWT_KEY, {
  //               expiresIn: "15s",
  //             });
  //             const refreshToken = jwt.sign(payload, process.env.JWT_KEY);
  //             refreshTokens.push(refreshToken);
  //             res.status(200).json({
  //               message: "Successfully authenticated user",
  //               accessToken: accessToken,
  //               refreshToken: refreshToken,
  //               userId: user._id,
  //             });
  //           } else {
  //             res.status(401).json({
  //               message: "Failed to authenticate user",
  //             });
  //           }
  //         })
  //         .catch((err) => {
  //           res.status(500).json({
  //             error: err,
  //           });
  //         });
  //     } else {
  //       // User does not exist
  //       res.status(401).json({
  //         message: "Failed to authenticate user",
  //       });
  //     }
  //   })
  //   .catch((err) => {
  //     res.status(500).json({
  //       error: err,
  //     });
  //   });
});

app.listen(port);
