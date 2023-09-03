const Product = require('../modules/productmodel');

const express = require("express");
const router = express.Router();
const customError = require("../CustomError");

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.send(products);
    } catch (error) {
        res.status(500).send({ error: 'Error fetching products' });
    }
};

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
module.exports = exports;