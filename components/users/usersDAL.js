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
    const find = await collection.find({
      username: user.username,
    });
    const results = await find.toArray((err, user) => {
      if (err) {
        reject(err);
      }
      resolve(user);
    });
  });
};

module.exports = { getUserDAL, addUserDAL, checkIfUserExistDAL };

//get list of all users
// const getUsersDAL = async () => {
//   return new Promise(async (resolve, reject) => {
//     const dbState = db.getDB();
//     const collection = await dbState.collection(usersCollection);
//     const find = await collection.find({});
//     const results = await find.toArray((err, users) => {
//       if (err) {
//         reject(err);
//       }
//       resolve(users);
//     });
//   });
// };
