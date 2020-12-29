const db = require("../../dbconfig");
const { checkIfProductExist } = require("./productsModel");
//variables
const productsCollection = "products";

//get list of all products
const getProductsDAL = async () => {
  try {
    return new Promise(async (resolve, reject) => {
      const dbState = db.getDB();
      const collection = await dbState.collection(productsCollection);
      const find = await collection.find({});
      const results = await find.toArray((err, products) => {
        if (err) reject(err);
        resolve(products);
      });
    });
  } catch (err) {
    console.log("error in productsDAL", err);
  }
};

//add new product to database
const addProductDAL = async (product) => {
  const check = await checkIfProductExist(product);
  if (!check) {
    return new Promise(async (resolve, reject) => {
      const dbState = db.getDB();
      const collection = await dbState.collection(productsCollection);
      const insertProduct = await collection.insertOne(
        product,
        (err, response) => {
          if (err) reject(err);
          if (response.result.ok === 1) {
            resolve(response.result.ok);
          }
        }
      );
    });
  } else {
    return 2;
  }
};
module.exports = { getProductsDAL, addProductDAL };
