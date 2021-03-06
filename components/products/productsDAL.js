const db = require("../../dbconfig");
const { GridFSBucket } = require("mongodb");
var fs = require("fs");
//variables
const productsCollection = "products";

const checkIfProductExist = async (product) => {
  return new Promise(async (resolve, reject) => {
    const productName = product.name;
    const dbState = db.getDB();
    const collection = await dbState.collection(productsCollection);
    const findProduct = await collection.find({
      name: productName,
    });
    const results = await findProduct.toArray((err, product) => {
      if (err) reject(err);
      if (product.length === 0) {
        return resolve(false);
      } else {
        resolve(true);
      }
    });
  });
};
/************************************************************************/
//get list of all products
const getProductsDAL = async () => {
  try {
    return new Promise(async (resolve, reject) => {
      const dbState = db.getDB();
      console.log("db in getProductsDAL", dbState);
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
  const dbState = db.getDB();
  //storying media files to mongodb
  const gridfsBucket = new GridFSBucket(dbState);
  fs.createReadStream("./CROISSANTS.jpg")
    .pipe(gridfsBucket.openUploadStream("CROISSANTS.jpg"))
    .on("error", (err) => {
      console.log("err", err);
    })
    .on("finish", () => {
      console.log("done");
    });

  //checking if products already exist in database
  const productExist = await checkIfProductExist(product);
  if (!productExist) {
    return new Promise(async (resolve, reject) => {
      // const dbState = db.getDB();
      const collection = await dbState.collection(productsCollection);
      const insertProduct = await collection.insertOne(
        product,
        (err, results) => {
          if (err) reject(err);
          if (results.result.ok === 1) {
            resolve(results.result.ok);
          }
        }
      );
    });
  } else {
    return 2;
  }
};
module.exports = { getProductsDAL, addProductDAL };
