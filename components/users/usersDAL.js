//THIS SCRIPT IS THE DATA ACCESS LAYER(DAL) FOR USERS
//The data access layer interacts with the database by performing queries

const db = require("../../dbconfig");

//variables
const usersCollection = "users";

//returns true if user exist, false if user doesn't.
const checkIfUserExistDAL = async (user) => {
  return new Promise(async (resolve, reject) => {
    const userEmail = user.email;
    const username = user.username;
    const dbState = db.getDB();
    const collection = await dbState.collection(usersCollection);
    const userDB = await collection.findOne({
      username: username,
      email: userEmail,
    });
    if (userDB) {
      return resolve(userDB);
    } else {
      return resolve(false);
    }
  });
};

//add new user to database
//returns 1 if successfull or err if it failed
const addUserDAL = async (user) => {
  return new Promise(async (resolve, reject) => {
    //insert user with hashed password
    const dbState = db.getDB();
    const collection = await dbState.collection(usersCollection);
    const insertUser = await collection.insertOne(user, (err, results) => {
      if (results.result.ok === 1) {
        resolve(results.result.ok);
      } else {
        reject(err);
      }
    });
  });
};

//if user isn't found, it returns an empty array.
//otherwise it returns an array with user object
const getUserDAL = async (user) => {
  return new Promise(async (resolve, reject) => {
    const dbState = db.getDB();
    const collection = await dbState.collection(usersCollection);
    const userDB = await collection.findOne({
      username: user.username,
    });
    if (userDB) {
      return resolve(userDB);
    } else {
      return resolve(false);
    }
  });
};

module.exports = { getUserDAL, addUserDAL, checkIfUserExistDAL };
