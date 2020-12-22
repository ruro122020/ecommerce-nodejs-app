const MongoClient = require("mongodb").MongoClient;
const dotenv = require("dotenv").config();
const ObjectID = require("mongodb").ObjectID;
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.bxgaj.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`;

//variables
const dbName = "ecommerce";
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };

/*************************************************************/
const state = {
  db: null,
};

const connect = (cb) => {
  if (state.db) {
    cb();
  } else {
    MongoClient.connect(uri, mongoOptions, (err, client) => {
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
