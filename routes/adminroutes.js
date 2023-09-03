const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');
const  {authorized , adminauthorized} = require('../middleware');

// Admin routes for product management
router.post('/products',adminauthorized, adminController.createProduct);
router.get('/products',adminauthorized ,adminController.getProducts);
router.get('/product/:id',adminauthorized ,adminController.getProduct);
router.patch('/products/:id', adminauthorized,adminController.updateProduct);
router.delete('/products/:id', adminauthorized,adminController.deleteProduct);

// Admin routes for user account management
router.get('/users', adminauthorized,adminController.listUsers);
router.get('/users/:id', adminauthorized,adminController.getuser);
router.delete('/users/:id', adminauthorized,adminController.deleteUser);

module.exports = router;
