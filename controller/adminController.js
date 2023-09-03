const express = require("express");
const router = express.Router();
const customError = require("../CustomError");

const Product = require('../modules/productmodel'); 
const User = require('../modules/usermodel'); 

// CRUD operations for products

exports.createProduct = async (req, res) => {
    try {
        const { name, price, description, quantity } = req.body;
        const newProduct = new Product({ name, price, description, quantity });
        const savedProduct = await newProduct.save();
        res.status(200).send(savedProduct);
    } catch (error) {
        res.status(404).send({ error: 'Error creating product' });
    }
};

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
       /*  if (products) res.send(products);
        next(
            customError({
              statusCode: 404,
              message: "Error fetching products",
            })
          );*/
          if (!products) {
            return res.status(400).send({ message: 'Error fetching products' });
          }
    
          res.send(products);
    } catch (error) {
        res.status(404).send({ error: 'Error fetching products' });
    }
};
// getbyId
exports.getProduct = async (req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findById(id);
        if (!product) {
            res.status(404).send({ message: 'Product not found' });
            return;
        }
        res.send(product);
    } catch (error) {
        res.status(500).send({ error: 'Error fetching product' });
    }
};


exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, description, quantity } = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { name, price, description, quantity },
            { new: true }
        );
        if (!updatedProduct) {
            res.status(404).send({ message: 'Product not found' });
            return;
        }
        res.status(200).send("updated");
    } catch (error) {
        res.status(404).send({ error: 'Error updating product' });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const {id} =req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            res.status(404).send({ message: 'Product not found' });
            return;
        }
        res.send('deleted');
    } catch (error) {
        res.status(400).send({ error: 'Error deleting product' });
    }
};

// User account management



exports.listUsers = async (req, res) => {
    try {
        const users = await User.find({});
      /*  res.send(users);
        next(
            customError({
              statusCode: 404,
              message: "Error fetching users",
            })
          );
          */
          if (!users) {
            return res.status(400).send({ message: 'Error fetching users' });
          }
    
          res.send(users);
    } catch (error) {
        res.status(400).send({ error: 'Error fetching users' });
    }
};
exports.getuser = async (req, res) => {
    try {
        const {id} = req.params
        const getUser = await User.findById(id);
        if (!getUser) {
            res.status(404).send({ message: 'user not found' });
            return;
        }
        res.send(getUser);
    }catch (error) {
        res.status(500).send({ error: 'Error fetching user' });
    }
};


exports.deleteUser = async (req, res) => {
    try {
        const {id} =req.params;
       const deleteUser = await User.findByIdAndDelete(id);
        if (!deleteUser) {
            res.status(404).send({ message: 'user not found' });
            return;
        }
        res.send( 'User deleted' );
    } catch (error) {
        res.status(404).send({ error: 'Error deleting user' });
    }
};

module.exports = exports;