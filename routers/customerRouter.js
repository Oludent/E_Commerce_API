const express = require('express');

const {createCustomer, getAllCustomer, getOneCustomer, updateCustomer, deleteCustomer}= require('../controllers/customerController')
const {createCustomerValidation} = require('../middleware/customerValidation')

const router = express.Router();

router.post('/createcustomer', createCustomerValidation, createCustomer);
router.get('/allcustomers', getAllCustomer);
router.get('/getonecustomer/:id', getOneCustomer);
router.patch('/updatecustomer/:id', updateCustomer);
router.delete('/deletecustomer/:id', deleteCustomer)


module.exports = router