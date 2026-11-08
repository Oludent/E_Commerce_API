const express = require('express');

const {createCart, getAllCart, getCart, deleteCart}= require('../controllers/cartController')

const router = express.Router();

router.post('/createcart/:customerId', createCart);
router.get('/getallcart', getAllCart);  
router.get('/getcart/:id', getCart);
router.delete('/deletecart/:id', deleteCart)


module.exports = router