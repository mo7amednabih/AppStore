const mongoose =require('mongoose');

const productSchema = new mongoose.Schema({
    name: "string",
    price: "number",
    description : "string",
    quantity: {
        type: Number,
        default: 0,
    }
  })
  module.exports = productSchema