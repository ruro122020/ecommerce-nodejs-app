//mongodb model tooling is called object document mapping
//Database modeling for noSQL databases use Object Datasource Mapping (ODM)

const db = require("../../dbconfig");
const usersCollection = "users";

const checkIfUserExist = async (userInfo) => {
  return new Promise(async (resolve, reject) => {
    const userEmail = userInfo.email;
    const username = userInfo.username;
    const dbState = db.getDB();
    const collection = await dbState.collection(usersCollection);
    const findUser = await collection.find({
      username: username,
      email: userEmail,
    });
    const user = await findUser.toArray((err, user) => {
      if (err) reject(err);
      if (user.length === 0) {
        return resolve(false);
      } else {
        resolve(true);
      }
    });
  });
};

module.exports = { checkIfUserExist };
