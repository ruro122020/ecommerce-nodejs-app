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
          reject("did not work");
        }
        resolve(documents);
      });
    });
  } catch (err) {
    console.log("error in usersDAL", err);
  }
};

const postUserDAL = async (clientSideInfo) => {
  //connect to mongodb
  client.connect((err) => {
    if (err) console.log("err", err);

    //retrieve database object
    const db = client.db(dbName);

    //insert data to mongodb
    db.collection(usersCollection).insertOne(
      clientSideInfo,
      (err, response) => {
        try {
          if (err)
            console.log("there was an error adding the data to mongodb", err);

          //passing results to service layer
          if (response.result.ok === 1) {
            const successful = response.result.ok;
            console.log("successful", successful);
            serviceCB(successful);
          }
        } catch (err) {
          console.log("err in inserOne", err);
        }
      }
    );
  });
};
module.exports = { getUsersDAL, postUserDAL };
