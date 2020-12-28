//THIS SCRIPT IS THE DATA ACCESS LAYER(DAL) FOR USERS
//The data access layer interacts with the database by performing queries

const db = require("../../dbconfig");

//variables
const usersCollection = "users";

//get list of all users
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
//add new user to database
const addUserDAL = async (userInfo) => {
  /*
  note: make sure user doesn't already exist
  */
  return new Promise(async (resolve, reject) => {
    const dbState = db.getDB();
    const collection = await dbState.collection(usersCollection);
    const insertUser = await collection.insertOne(userInfo, (err, response) => {
      console.log("response", response);
      if (err) reject(err);
      if (response.result.ok === 1) {
        resolve(response.result.ok);
      }
    });
  });
};
module.exports = { getUsersDAL, addUserDAL };
