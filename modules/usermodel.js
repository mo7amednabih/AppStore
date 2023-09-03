const mongoose = require("mongoose");
const userSchema = require('../Schema/userSchema')
const usermodel = mongoose.model("user", userSchema);



module.exports = usermodel
