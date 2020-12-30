//THIS SCRIPT IS THE DATA ACCESS LAYER(DAL) FOR USERS
//The data access layer interacts with the database by performing queries

//functions that end with DAL are exported and used in services.
//functions that don't end in DAL are seperations of concerns

const db = require("../../dbconfig");

//variables
const usersCollection = "users";

const checkIfUserExist = async (user) => {
  return new Promise(async (resolve, reject) => {
    const userEmail = user.email;
    const username = user.username;
    const dbState = db.getDB();
    const collection = await dbState.collection(usersCollection);
    const findUser = await collection.find({
      username: username,
      email: userEmail,
    });
    const results = await findUser.toArray((err, user) => {
      if (err) reject(err);
      if (user.length === 0) {
        return resolve(false);
      } else {
        resolve(true);
      }
    });
  });
};
/********************************************************************/

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
  const userExist = await checkIfUserExist(user);
  if (!userExist) {
    return new Promise(async (resolve, reject) => {
      //insert user with hashed password
      const dbState = db.getDB();
      const collection = await dbState.collection(usersCollection);
      const insertUser = await collection.insertOne(user, (err, results) => {
        if (err) reject(err);
        if (results.result.ok === 1) {
          resolve(results.result.ok);
        }
      });
    });
  } else {
    return 2;
  }
};

module.exports = { getUsersDAL, addUserDAL };
