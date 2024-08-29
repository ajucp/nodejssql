const express=require('express');
const routes=express.Router();

const userController=require('../controllers/user');
const productController=require('../controllers/product');
const cartController=require('../controllers/cart');

// routes.post('/user',userController.postUser);
routes.get('/users',userController.getUser);
routes.get('/users/:userID',userController.getUserById);

routes.post('/user',userController.postCreateUser);

routes.post('/product',productController.postProduct);
routes.get('/products',productController.getProduct);

routes.post('/cart',cartController.postCart);
routes.get('/cart',cartController.getCart);
routes.post('/cart-add',cartController.postAddcart);
routes.post('/users/:userID/cart-items',cartController.getCartByUserId);
// routes.get('/:userId/product/:product',cartController.getCartByUserId)
routes.patch('/users/:userID/delete',cartController.patchCartById)

module.exports=routes;