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
const usersController = express.Router();
const { getUsersSL, addUserSL } = require("./usersService");

const verfiyToken = (req, res, next) => {};

//SECURE THIS ROUTE
usersController.get("/users", async (req, res) => {
  try {
    const users = await getUsersSL();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});
/**********************REGISTRATION ROUTES****************************/
//User Registration Route
usersController.post("/register-user", async (req, res) => {
  try {
    const userInfo = req.body;
    const results = await addUserSL(userInfo);
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({
      msg: err,
    });
  }
});

//Admin Registration Route
usersController.post("/register-admin", async (req, res) => {});

//Employee Registration Route
usersController.post("/register-employee", async (req, res) => {});
/**********************LOGIN ROUTES***********************************/
//User Login Route
usersController.post("/login-user", async (req, res) => {});
//Admin Login Route
usersController.post("/login-admin", async (req, res) => {});
//Employee Login Route
usersController.post("/login-employee", async (req, res) => {});
/**********************PROTECTED ROUTES********************************/
//User Protected Route
usersController.post("/user/:id/profile", verfiyToken, async (req, res) => {});
usersController.post("/user/:id/account", verfiyToken, async (req, res) => {});

//Admin Protected Route
usersController.post("/admin/:id/profile", verfiyToken, async (req, res) => {});
usersController.post("/admin/:id/account", verfiyToken, async (req, res) => {});
//Employee Protected Route
usersController.post(
  "/employee/:id/profile",
  verfiyToken,
  async (req, res) => {}
);
usersController.post(
  "/employee/:id/account",
  verfiyToken,
  async (req, res) => {}
);
module.exports = usersController;
