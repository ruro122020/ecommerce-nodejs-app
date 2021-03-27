const db = require("../../dbconfig");

//variables
const adminCollection = "admin";

const checkIfAdminExistDAL = async (admin) => {
  return new Promise(async (resolve, reject) => {
    const adminUsername = admin.username;
    const dbState = db.getDB();
    const collection = await dbState.collection(adminCollection);
    const adminDB = await collection.findOne({
      username: adminUsername,
    });
    console.log("adminDB in checkifadminexistDAL", adminDB);
    if (adminDB) {
      return resolve(true);
    } else {
      return resolve(false);
    }
  });
};

const addAdminDAL = async (admin) => {
  return new Promise(async (resolve, reject) => {
    const dbState = db.getDB();
    const collection = await dbState.collection(adminCollection);
    await collection.insertOne(admin, (err, results) => {
      if (results.result.ok === 1) {
        resolve(results.result.ok);
      } else {
        reject(err);
      }
    });
  });
};

const getAdminDAL = async (admin) => {
  return new Promise(async (resolve, reject) => {
    //get admin username and password
    console.log("admin in getadminDAL", admin);
    const username = admin.username;
    const dbState = db.getDB();
    const collection = await dbState.collection(adminCollection);
    const adminDB = await collection.findOne({
      username: username,
    });
    console.log("adminDB in getAdminDAL", adminDB);
    if (adminDB) {
      return resolve(adminDB);
    } else {
      return resolve(false);
    }
  });
};

module.exports = { checkIfAdminExistDAL, addAdminDAL, getAdminDAL };
