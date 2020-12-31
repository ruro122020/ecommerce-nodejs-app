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
  if (userIsAuthenticated.verified) {
    //create jwt token
    const accessToken = jwt.sign(
      userIsAuthenticated.user,
      process.env.ACCESS_TOKEN_SECRET
    );
    // send token back to client
    res.status(200).json({ accessToken: accessToken });
  } else {
    res.status(400).json({
      msg: "Cannot find User",
    });
  }
});

// //Admin Login Route
// usersController.post("/login-admin", async (req, res) => {});
// //Employee Login Route
// usersController.post("/login-employee", async (req, res) => {});
/**********************PROTECTED ROUTES********************************/
//User Protected Route
const verfiyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token === null) return res.status(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403);
    req.user = user;
    next();
  });
};
usersController.post("/user/:id/profile", verfiyToken, async (req, res) => {});

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
