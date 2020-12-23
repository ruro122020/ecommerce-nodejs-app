//THIS SCRIPT IS THE SERVICE LAYER FOR USERS
//Use a service layer for you business logic.

//code example to model
/*
 */

const db = require("../../dbconfig");

//variables
const usersCollection = "users";

const handleRequest = async () => {
  const getData = db.getDB();

  const data = await getData
    .collection(usersCollection)
    .find({})
    .toArray((err, documents) => {
      if (err) {
        console.log(err);
        return err;
      } else {
        console.log("documents in handleRequest function", documents);
        return documents;
      }
    });
  console.log("data", data);
  return data;
};

module.exports = handleRequest;
