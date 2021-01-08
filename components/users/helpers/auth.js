const jwt = require("jsonwebtoken");

const verfiyToken = (req, res, next) => {
  console.log("in verify token");
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1];

  if (token === null) {
    return res.status(401).json({ msg: "token is null" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log("err", err);
    if (err) return res.status(403).json({ msg: "invalid token", err: err });
    req.user = user;
    next();
  });
};

const createTokens = (user, secret, secret2) => {
  const createToken = jwt.sign(user, secret, { expiresIn: "1m" });
  const createRefreshedToken = jwt.sign(user, secret2, { expiresIn: "7d" });
  return Promise.all([createToken, createRefreshedToken]);
};

module.exports = { verfiyToken };
