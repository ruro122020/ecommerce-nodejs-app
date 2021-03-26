const db = require("../../dbconfig");

//variables
const adminCollection = "admin";

const checkIfAdminExistDAL = async (admin) => {
  return new Promise(async (resolve, reject) => {
    const adminEmail = admin.email;
    const adminUsername = admin.username;
    const dbState = db.getDB();
    const collection = await dbState.collection(adminCollection);
    const findAdmin = await collection.findOne({
      email: adminEmail,
      username: adminUsername,
    });

    if (findAdmin) {
      return resolve(true);
    } else {
      return resolve(false);
    }
  });
};

const addAdminDAL = async (admin) => {
  return new Promise(async (resolve, reject) => {
    dbstate = db.getDB();
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

module.exports = { checkIfAdminExistDAL };
