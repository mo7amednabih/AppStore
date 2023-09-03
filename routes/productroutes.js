const express = require('express');
const router = express.Router();
const adminController = require('../controller/productController');

router.get('/' ,adminController.getProducts);
router.get('/:id' ,adminController.getProduct);
module.exports = router;