const router = require('express').Router();
const { createOrder, getAllOrders, getOneOrder, updateOrder, deleteOrder } = require('../controllers/ordersController');

router.post('/newOrder', createOrder);
router.get('/allOrders', getAllOrders);
router.get('/oneOrder/:id', getOneOrder);
router.put('/updatedOrder/:id', updateOrder);
router.delete('/deletedOrder/:id', deleteOrder);

module.exports = router;