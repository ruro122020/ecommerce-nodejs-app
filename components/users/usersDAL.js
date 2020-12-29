//THIS SCRIPT IS THE DATA ACCESS LAYER(DAL) FOR USERS
//The data access layer interacts with the database by performing queries

const db = require("../../dbconfig");
const { checkIfUserExist } = require("./usersModel");

//variables
const usersCollection = "users";

//get list of all users
const getUsersDAL = async () => {
  return new Promise(async (resolve, reject) => {
    const dbState = db.getDB();
    const collection = await dbState.collection(usersCollection);
    const find = await collection.find({});
    const results = await find.toArray((err, users) => {
      if (err) {
        reject(err);
      }
      resolve(users);
    });
  });
};

//add new user to database
const addUserDAL = async (user) => {
  const check = await checkIfUserExist(user);
  if (!check) {
    return new Promise(async (resolve, reject) => {
      const dbState = db.getDB();
      const collection = await dbState.collection(usersCollection);
      const insertUser = await collection.insertOne(user, (err, response) => {
        if (err) reject(err);
        if (response.result.ok === 1) {
          resolve(response.result.ok);
        }
      });
    });
  } else {
    return 2;
  }
};

module.exports = { getUsersDAL, addUserDAL };
