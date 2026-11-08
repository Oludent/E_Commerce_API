const express = require('express');

const router = express.Router();

const {addToCart, getALLCartItem, getOneCartItem, updateCartItem, deleteCartItem, } = require('../controllers/cartItemController')

router.post('/addtocart/:cartId', addToCart);
router.get('/getcartItem/', getALLCartItem);
router.get('/getonecartitem/:id', getOneCartItem);
router.patch('/updatecartitem/:id', updateCartItem);
router.delete('/deletecartitem/:id', deleteCartItem)



module.exports = router