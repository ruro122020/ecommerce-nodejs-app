const MongoClient = require("mongodb").MongoClient;
const dotenv = require("dotenv").config();
const ObjectID = require("mongodb").ObjectID;
const assert = require("assert");
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.bxgaj.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`;
const url = "mongodb://localhost:27017";
const dbName = "ecommerce1";
const collection = "users";
const client = new MongoClient(url);
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };

/*************************************************************/
const state = {
  db: null,
};

const connect = (cb) => {
  if (state.db) {
    cb();
  } else {
    MongoClient.connect(url, mongoOptions, (err, client) => {
      if (err) {
        cb(err);
      } else {
        state.db = client.db(dbName);
        cb();
      }
    });
  }
};

const getPrimaryKey = (_id) => {
  return ObjectID(_id);
};

const getDB = () => {
  return state.db;
};

module.exports = { getDB, getPrimaryKey, connect };
/********************************************************/
// let connection = null;
// module.exports.connect = () =>
//   new Promise((resolve, reject) => {
//     MongoClient.connect(
//       uri,
//       { useNewUrlParser: true, useUnifiedTopology: true },
//       function (err, db) {
//         if (err) {
//           reject(err);
//           return err;
//         }
//         resolve(db);
//         connection = db;
//       }
//     );
//   });

// module.exports.get = () => {
//   if (!connection) {
//     throw new Error("Call connect first!");
//   }

//   return connection;
// };
