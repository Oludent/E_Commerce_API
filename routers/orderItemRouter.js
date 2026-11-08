const express = require('express');

const {addProductToCart, getOrderItems, updateOrderItem, removeProductFromCart}= require('../controllers/orderItemController')


const router = express.Router();

router.post('/createorderitem', addProductToCart);
router.get('/getoneorderitem/:id', getOrderItems);
router.patch('/updateorderitem/:id', updateOrderItem);
router.delete('/deleteorderitem/:id', removeProductFromCart)


module.exports = router