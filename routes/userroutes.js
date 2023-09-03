const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const  {authorized , tokenauthorized} = require('../middleware');

// User registration and authentication
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.patch('/edit/:id',authorized ,userController.updateuser);
router.delete('/del/:id', authorized,userController.deleteuser);

// User routes for adding to cart, verifying/canceling orders
router.post('/cart/:productId/:quantity', tokenauthorized,userController.addToCart);
router.post('/verifyOrder', tokenauthorized,userController.verifyOrder);
router.post('/cancelOrder', tokenauthorized,userController.cancelOrder);
router.get('/cart/list', tokenauthorized, userController.listProducts);
router.delete('/del/:productId', tokenauthorized, userController.deleteOrder);
module.exports = router;