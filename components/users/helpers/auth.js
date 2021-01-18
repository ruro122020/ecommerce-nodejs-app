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
    console.log("user", user);
    req.user = user;
    next();
  });
};

/*DATA USER THAT IS IN JWT.VERIFY
 user = {
  _id: '6005d7dde9cd9b384cc98a83',
  name: null,
  username: 'tracy',
  email: null,
  password: '$2b$10$X3I9APgZ30kx3ekUhU66yuvYZa4DfliTLUQPuY8RDebr78p308evq',
  DOB: null,
  addresses: null,
  paymentMethods: null,
  contact: null,
  date: '2021-01-18T18:47:57.527Z',
  iat: 1610995704,
  exp: 1611600504
}
  
 */
module.exports = { verfiyToken };
