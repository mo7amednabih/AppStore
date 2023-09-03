
const jwt = require('jsonwebtoken');
const express = require("express");
const router = express.Router();
const customError = require("../CustomError");
const bcrypt = require('bcrypt')
const utli = require('util')

const Product = require('../modules/productmodel'); 
const User = require('../modules/usermodel'); 
exports.registerUser = async (req, res) => {
    try {
        const { email, firstname, lastname, username, password, phonenumber, address, isAdmin } = req.body;
        const newUser = new User({ email, firstname, lastname, username, password, phonenumber, address, isAdmin });
        try {
            await newUser.validate();
        } catch (validationError) {
            const errors = [];
            for (const key in validationError.errors) {
                errors.push(validationError.errors[key].message);
            }
            return res.status(400).send({ errors });
        }
        await newUser.save();
        res.status(200).send(newUser);
    } catch (error) {
        res.status(500).send({ error: 'Error registering user' });
    }
};


exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
  /*      
  if (!user) {
    next(customError({
      statusCode: 401,
      message: "password or email is not correct"

    }))
  }
  */
  if (!user) {
    return res.status(400).send({ message: 'password or email is not correct' });
  }


  const copmarpass = await bcrypt.compare(password, user.password)
  if (copmarpass) {
    const token = await user.generateToken()
    res.status(200).send(token)
  }

if(!copmarpass){
    return res.status(400).send({ message: 'password or email is not correct' });
}
/*
  next(customError({
    statusCode: 401,
    message: "password or email is not correct"
  }))
*/
    } catch (error) {
        res.status(404).send({ error: 'Error logging in' });
    }
};

exports.deleteuser = async (req, res) => {
    try {
        const {id} =req.params;
        const deleteduser = await User.findByIdAndDelete(id);
        if (!deleteduser) {
            res.status(404).send({ message: 'user not found' });
            return;
        }
        res.send('deleted');
    } catch (error) {
        res.status(400).send({ error: 'Error deleting user' });
    }
};
//update
exports.updateuser = async (req, res) => {
    try {
        const { id } = req.params;
        const { email, firstName, lastName, username, password, phoneNumber, address , isAdmin } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const updateduser = await User.findByIdAndUpdate(
            id,
            { email, firstName, lastName, username, password: hashedPassword, phoneNumber, address , isAdmin },
            { new: true }
        );

        if (!updateduser) {
            res.status(404).send({ message: 'user not found' });
            return;
        }

        res.status(200).send("updated");
    } catch (error) {
        res.status(500).send({ error: 'Error updating user' });
    }
};



exports.addToCart = async (req, res) => {
    try {
        const userId = req.id; 
        const productId = req.params.productId; 
        const quantity = req.params.quantity; 
        
        
        const user = await User.findById(userId);
        const product = await Product.findById(productId);

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        if (!product) {
            return res.status(404).send({ message: 'Product not found' });
        }
        if(quantity>product.quantity){
            return res.status(404).send({ message: `the quantity is larger than available , the available is ${product.quantity}` });
        }
     

        // Check if the product is already in the cart
        const existingCartItem = user.cart.find(item => item.product.toString() === productId);
        
        if (existingCartItem) {
            existingCartItem.quantity+=+quantity;
            product.quantity=+product.quantity-Number(quantity);
            
        } else {
            user.cart.push({ product: productId, quantity: quantity, productName:product.name });
            product.quantity=+product.quantity-Number(quantity);
           
        }
        await product.save();
        await user.save();

        res.send('Product added');
    } catch (error) {
        res.status(404).send({ error: 'Error adding to cart' });
    }
};

exports.verifyOrder = async (req, res) => {
    try {
        const userId = req.id; 
       
        const user = await User.findById(userId) 
        
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        if (!user.cart || user.cart.length === 0) {
            return res.status(400).send({ message: 'Cart is empty' });
        }

       
        const productsInCart = user.cart;

        

        
        user.purchases.push(productsInCart);
        user.cart = [];
        await user.save();

        res.send({ message: 'Order verified and processed successfully' });
    } catch (error) {
        res.status(500).send({ error: 'Error verifying order' });
    }
};

exports.listProducts = async (req, res) => {
    try {
      const userid = req.id; 
      const user = await User.findById(userid).populate('cart');

      if (!user) {
        return res.status(400).send({ message: 'user not found' });
      }

      res.send(user.cart);
    } catch (error) {
        res.status(500).send({ error: 'Error fetching orders' });
    }
  },
  exports.deleteOrder = async (req, res) => {
    try {
      const userId = req.id;
      const productId = req.params.productId;
      const product = await Product.findById(productId);
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }
  
      const cartItem = user.cart.find(item => item.product.equals(productId));
  
      if (!cartItem) {
        return res.status(404).send({ message: 'Product not found in cart' });
      }
  
      const removedQuantity = cartItem.quantity;
  
      user.cart = user.cart.filter(item => !item.product.equals(productId));
  
      product.quantity += removedQuantity;
  
      await user.save();
      await product.save();
  
      res.status(200).send({ message: 'Product removed from cart successfully' });
    } catch (error) {
      res.status(500).send({ error: 'Error delete orders' });
    }
  };
  

  exports.cancelOrder = async (req, res) => {
    try {
        const userId = req.id; 
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        const quantitiesToRestore = {}; 
        
        user.cart.forEach(item => {
            const productId = item.product.toString();
            
            if (!quantitiesToRestore[productId]) {
                quantitiesToRestore[productId] = 0;
            }

            quantitiesToRestore[productId] += item.quantity;
        });

        user.cart = [];
        await user.save();

        for (const productId in quantitiesToRestore) {
            const product = await Product.findById(productId);
            if (product) {
                product.quantity += quantitiesToRestore[productId];
                await product.save();
            }
        }

        res.send({ message: 'Order canceled successfully' });
    } catch (error) {
        res.status(500).send({ error: 'Error canceling order' });
    }
};

module.exports = exports;