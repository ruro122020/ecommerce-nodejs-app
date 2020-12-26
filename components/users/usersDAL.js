//THIS SCRIPT IS THE DATA ACCESS LAYER(DAL) FOR USERS
//The data access layer interacts with the database by performing queries

//code example to model
/*
 */

const db = require("../../dbconfig");
const { client } = require("../../dbconfig");
const ObjectID = require("mongodb").ObjectID;
//variables
const usersCollection = "users";
const dbName = "ecommerce";

const getUsersDAL = async () => {
  try {
    return new Promise(async (resolve, reject) => {
      const dbState = db.getDB();
      const collection = await dbState.collection(usersCollection);
      const find = await collection.find({});
      const results = await find.toArray((err, documents) => {
        if (err) {
          reject(err);
        }
        resolve(documents);
      });
    });
  } catch (err) {
    console.log("error in usersDAL", err);
  }
};

const addUserDAL = async (userInfo) => {
  //insert data to mongodb
  return new Promise((resolve, reject) => {
    db.getDB()
      .collection(usersCollection)
      .insertOne(userInfo, (err, response) => {
        if (err) reject(err);
        if (response.result.ok === 1) {
          resolve(response.result.ok);
        }
      });
  });
};
module.exports = { getUsersDAL, addUserDAL };
