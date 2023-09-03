const mongoose = require("mongoose");
const productSchema = require('../Schema/productSchema')
const productmodel = mongoose.model("Product", productSchema);



module.exports = productmodel