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

//code example to model
/*
 */

const express = require("express");
const handleRequest = require("./usersService");
const router = express.Router();

router.get("/users", async (req, res) => {
  const documents = await handleRequest();
  console.log("documents", documents);
  res.json(documents);
});

module.exports = router;
