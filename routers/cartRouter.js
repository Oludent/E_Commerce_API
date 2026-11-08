const express = require('express');

const {createCart, getCart, deleteCart}= require('../controllers/cartController')

const router = express.Router();

router.post('/createcart', createCart);
router.get('/getcart/:customerId', getCart);
router.delete('/deletecart/:id', deleteCart)


module.exports = router