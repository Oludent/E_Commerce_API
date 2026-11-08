const {Customer, Product, Cart, OrderItem} = require('../models')

const addProductToCart = async (req, res) => {
    try {
        const { customerId, productId } = req.params;
        const { quantity } = req.body;

        // 1. Find the product
        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        // 2. Find the customer's cart
        let cart = await Cart.findOne({
            where: { customerId }
        });

        // 3. Create a cart if one doesn't exist
        if (!cart) {
            cart = await Cart.create({ customerId });
        }

        // 4. Check whether the product already exists in the cart
        const cartProduct = await OrderItem.findOne({
            where: {
                CartId: cart.id,
                productId
            }
        });

        // 5. Update quantity or create a new CartItem
        if (cartProduct) {
            cartProduct.quantity += quantity;
            await cartProduct.save();

            return res.status(200).json({
                message: "Product quantity updated",
                cartProduct
            });
        }

        const newCartItem = await OrderItem.create({
            CartId: cart.id,
            productId,
            quantity
        });

        res.status(201).json({
            message: "Product added to cart successfully",
            newCartItem
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


const getOrderItems = async (req, res) => {
    try {
        const { customerId } = req.params;

        const cart = await Cart.findOne({
            where: { customerId }
        });

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }

        const cartItems = await OrderItem.findAll({
            where: { CartId: cart.id },
            include: [Product]
        });

        res.status(200).json({
            message: "Cart items retrieved successfully",
            cartItems
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


const updateOrderItem = async (req, res) => {
    try {
        const { customerId, productId } = req.params;
        const { quantity } = req.body;

        if (!Number.isInteger(quantity) || quantity < 1) {
            return res.status(400).json({
                message: "Quantity must be a positive integer"
            });
        }

        const cart = await Cart.findOne({
            where: { customerId }
        });

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }

        const cartProduct = await OrderItem.findOne({
            where: {
                CartId: cart.id,
                productId
            }
        });

        if (!cartProduct) {
            return res.status(404).json({
                message: "Product not found in cart"
            });
        }

        cartProduct.quantity = quantity;
        await cartProduct.save();

        res.status(200).json({
            message: "Cart quantity updated successfully",
            cartProduct
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


const removeProductFromCart = async (req, res) => {
    try {
        const { customerId, productId } = req.params;

        const cart = await Cart.findOne({
            where: { customerId }
        });

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }

        const cartProduct = await OrderItem.findOne({
            where: {
                CartId: cart.id,
                productId
            }
        });

        if (!cartProduct) {
            return res.status(404).json({
                message: "Product not found in cart"
            });
        }

        await cartProduct.destroy();

        res.status(200).json({
            message: "Product removed from cart successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


module.exports = {
    addProductToCart,
    getOrderItems,
    updateOrderItem,
    removeProductFromCart
};

