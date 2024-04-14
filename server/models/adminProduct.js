const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new mongoose.Schema({
    name: String,
    category: String,
    price: Number,
    long_desc: String,
    stock: Number,
    short_desc: String,
    images: [String]
  });
  
  const Product = mongoose.model('AdminProducts', productSchema);
  
  module.exports = Product;

