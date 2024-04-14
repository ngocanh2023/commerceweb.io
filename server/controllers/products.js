const dataPros = require("../data/products.json");
const Products = require("../models/products");

exports.getDataPro = (req, res, next) => {
  Products.find()
    .then((result) => {
      res.json(result);
    })
    .catch((e) => console.log(e));
};
exports.postDataPro = (req, res, next) => {
  const dataId = req.query.id;
  // console.log("dataId", dataId);
  Products.findById(dataId)
    .then((result) => {
      res.json(result);
      console.log(result);
    })
    .catch((e) => {
      console.log(e);
    });
};

let proId;
exports.sendId = (req, res, next) => {
  proId = req.query.id;
  res.json({id: proId})
}

exports.deleteById = (req, res, next) => {
  Products.findByIdAndDelete(proId)
    .then(() => {
      res.send("Done!");
    })
    .catch((e) => console.log(e));
};
