// const { Model } = require('sequelize');
const { Order, Customer, Product } = require('../models');

const createOrder = async (req, res) => {
    try {
        const { customerId, productId, quantity } = req.body;

        const customer = await Customer.findByPk(customerId);
        if (!customer) {
            return res.status(404).json({
                message: 'Customer not found!'
            });
        }

        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({
                message: 'Product not found!'
            });
        }

        const newOrder = await Order.create({
            customerId,
            productId,
            quantity,
            purchasePrice,
            status: 'Pending'
        });

        res.status(201).json({
            message: 'Order created successfully!',
            data: newOrder
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getAllOrders = async (req, res) => {
  try {
    const allOrders = await Order.findAll();
    res.status(200).json({
      message: `Orders retrieved successfully and the number is: ${allOrders.length}`,
      data: allOrders
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getOneOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const oneOrder = await Order.findByPk(id, {
      attributes: ['productId', 'quantity', 'purchasePrice', 'status'],
      includes: {
        Model: Customers,
        as: 'customer',
        attributes: ['firstName', 'lastName', 'email']
      }
    });

    if (!oneOrder) {
      return res.status(404).json({
        message: 'Order not found!'
      });
    }

    res.status(200).json({
      message: 'Order retrieved successfully!',
      data: oneOrder
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedOrder = await Order.update({ status}, { where: { id } });

    if (!updatedOrder) {
      return res.status(404).json({
        message: 'Order not found!'
      });
    }

    res.status(200).json({
      message: 'Order updated successfully!',
      data: updatedOrder
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOrder = await Order.destroy({ where: { id } });

    if (!deletedOrder) {
      return res.status(404).json({
        message: 'Order not found!'
      });
    }

    res.status(200).json({
      message: 'Order deleted successfully!',
      data: deletedOrder
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
    createOrder,
    getAllOrders,
    getOneOrder,
    updateOrder,
    deleteOrder
};