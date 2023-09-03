const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const util = require('util');
const asyncSign = util.promisify(jwt.sign);
const secretKey = 'kkkk';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
      validator: function (email) {
        return /\S+@\S+\.\S+/.test(email);
      },
      message: 'Invalid email format',
    },
  },
  firstname: {
    type: String,
    required: true,
    minlength: [2, 'First name must be at least 2 characters'],
    trim: true,
  },
  lastname: {
    type: String,
    required: true,
    minlength: [2, 'Last name must be at least 2 characters'],
    trim: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [8, 'Password must be at least 8 characters'],
    validate: {
      validator: function (password) {
        // يحتوي على حرف كبير وحرف صغير ورقم ورمز
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(password);
      },
      message: 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
    },
  },
  phonenumber: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function (phonenumber) {
        return /^[0-9]{11}$/.test(phonenumber);
      },
      message: 'Invalid phone number format',
    },
  },
  address: {
    type: String,
    trim: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  cart: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      quantity: {
        type: Number,
        default: 1,
      },
      productName:{
        type : String,
      }
    },
  ],
  purchases:[

  ],

});

userSchema.pre('save', async function () {
  if (this.isModified('password')) {
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(this.password, saltRounds);
    this.password = hashedPassword;
  }
});

userSchema.methods.generateToken = function () {
  const token = asyncSign(
    {
      id: this.id,
      email: this.email,
      isAdmin: this.isAdmin,
    },
    secretKey
  );
  return token;
};

module.exports = userSchema;
