const {CartItem, Cart, Product} = require('../models')

const addToCart = async (req, res) => {
  try {
    const {cartId, productId} = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findByPk(cartId);

    if (!cart) {
      return res.status(404).json({
        message: 'Error creating product: Cart not found'
      });
    }

    const cartItem1 = await CartItem.findOne({ where: {quantity} });

    if (cartItem1) {
      return res.status(400).json({
        message: 'Error creating cartItem: Quantity already exists'
      });
    }

    const cartItem = await CartItem.create({
      quantity,
      cartId,
      productId
    });

    res.status(201).json({
      message: 'CartItem created successfully',
      data: cartItem
    });

  } catch (error) {
    res.status(500).json({
       message: error.message });
  }
};

const getALLCartItem = async (req, res) => {
  try {
    const cartII = await CartItem.findAll({attributes: ['quantity'],
      include: [{
        model: Product,
        as: 'products',
        attributes: ['name', 'description']
      }]
    });

    res.status(200).json({
      message: 'CartItems retrieved successfully',
      data: cartII
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOneCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const cartItem1 = await CartItem.findByPk(id, {
      attributes: ['quantity'],
      include: {
        model: Product,
        as: 'products',
        attributes: ['name', 'description', 'price']
      }
    });

    if (!cartItem1) {
      return res.status(404).json({
        message: 'CartItem not found'
      });
    }

    res.status(200).json({
      message: 'CartItem found successfully',
      data: cartItem1
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const {id} = req.params;
    
    const cartItem = await CartItem.findByPk(id);

    if (!cartItem) {
      return res.status(404).json({
        message: 'CartItem not found'
      });
    }

    const updateit = await CartItem.update(req.body);

    res.status(200).json({
      message: 'CartItem updated successfully',
      data: updateit
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCartItem = async (req, res) => {
  try {
    const {id} = req.params;
    const cartItem = await CartItem.findByPk(id);

    if (!cartItem) {
      return res.status(404).json({
        message: 'CartItem not found'
      });
    }

    const deleteCartI = await cartItem.destroy(id);

    res.status(200).json({
      message: 'CartItem deleted successfully',
      data: deleteCartI
    });

  } catch (error) {
    res.status(500).json({ 
        message: error.message });
  }
};

module.exports = {
  addToCart,
  getALLCartItem,
  getOneCartItem,
  updateCartItem,
  deleteCartItem
};