//THIS SCRIPT IS THE CONTROLLER LAYER FOR USERS
//Controllers receive incoming client requests, and they leverage services

//PROCESS
/*
step 1: controller receive incoming client requests and leverages services
step 2: controller send request to service layer
step 3: serive layer make calls to the data access layer(DAL)
step 4: data access layer(DAL) performs queries and interact with database
step 5: data acces layer send results back up to service layer
step 6: service layer recieves results from DAL and then hand everything back to controller
step 7: controller responds to the client
 */

const express = require("express");
const jwt = require("jsonwebtoken");
const usersController = express.Router();
const { addUserSL, authenticateUserSL } = require("./usersService");

const verfiyToken = (req, res, next) => {
  console.log("in verify token");
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1];

  if (token === null) return res.status(401).json({ msg: "token is null" });
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log("err", err);
    if (err) return res.status(403).json({ msg: "invalid token", err: err });
    req.user = user;
    next();
  });
};
//SECURE THIS ROUTE
// usersController.get("/users", async (req, res) => {
//   try {
//     const users = await getUsersSL();
//     res.status(200).json(users);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
/**********************REGISTRATION ROUTES****************************/
//User Registration Route
usersController.post("/register-user", async (req, res) => {
  try {
    const userRegistration = req.body;
    const results = await addUserSL(userRegistration);
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({
      msg: err,
    });
  }
});

// //Admin Registration Route
// usersController.post("/register-admin", async (req, res) => {});

// //Employee Registration Route
// usersController.post("/register-employee", async (req, res) => {});
/**********************LOGIN ROUTES***********************************/
//User Login Route
usersController.post("/login-user", async (req, res) => {
  const userLogin = req.body;
  //Authenticate user
  const userIsAuthenticated = await authenticateUserSL(userLogin);
  console.log("user id", userIsAuthenticated.user._id);
  if (userIsAuthenticated.verified) {
    //create jwt token
    const accessToken = jwt.sign(
      userIsAuthenticated.user,
      process.env.ACCESS_TOKEN_SECRET
    );
    // send token to client
    res.status(200).json({ accessToken: accessToken });
  } else {
    res.status(400).json({
      msg: "Not allowed",
    });
  }
});

// //Admin Login Route
// usersController.post("/login-admin", async (req, res) => {});
// //Employee Login Route
// usersController.post("/login-employee", async (req, res) => {});
/**********************PROTECTED ROUTES********************************/
//User Protected Route

usersController.get("/:id/profile", verfiyToken, async (req, res) => {
  const user = req.user;
  const id = req.params;
  //Once token is verified, check if id params match as well
  if (user._id === id.id) {
    res.status(200).json({
      user: user,
    });
  } else {
    res.status(401).json({
      msg: "user id does not match",
    });
  }
});

// usersController.post("/user/:id/account", verfiyToken, async (req, res) => {});
// usersController.post("/user/:id/cart", verfiyToken, async (req, res) => {});
// usersController.post("/user/:id/order", verfiyToken, async (req, res) => {});
// //Admin Protected Route
// usersController.post("/admin/:id/profile", verfiyToken, async (req, res) => {});
// usersController.post("/admin/:id/account", verfiyToken, async (req, res) => {});
// //Employee Protected Route
// usersController.post(
//   "/employee/:id/profile",
//   verfiyToken,
//   async (req, res) => {}
// );
// usersController.post(
//   "/employee/:id/account",
//   verfiyToken,
//   async (req, res) => {}
// );
module.exports = usersController;
