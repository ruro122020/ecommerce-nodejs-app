//mongodb model tooling is called object document mapping
//Database modeling for noSQL databases use Object Datasource Mapping (ODM)

const { client } = require("../../dbconfig");
const usersCollection = "users";

class Users {
  constructor(param1, param2) {
    //do stuff with params
  }

  findUser() {
    //do stuff
  }

  getListOfUsers() {
    // .collection(usersCollection)
    // .find({})
    // .toArray((err, documents) => {
    //   if (err) {
    //     console.log(err);
    //     return err;
    //   } else {
    //     console.log("documents in DAL function", documents);
    //     return documents;
    //   }
    // });
  }

  insertUser() {
    //do stuff
  }

  updateUser() {
    //do some stuff
  }
  deleteUser() {
    //do some stuff
  }
}

module.exports = Users;
