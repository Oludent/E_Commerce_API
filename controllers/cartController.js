const {Cart, Product, Customer} = require('../models');

const createCart = async (req, res)=>{
    try {
        const {customerId} = req.params;
        
        const cart = await Cart.findOne({where: {customerId}});

        if (cart) {
            return res.send("Cart already exist")
        }
        const newCart = await Cart.create({
            customerId,
        })

        res.status(200).json({
            message: "Cart created successfully", newCart
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


const deleteCart = async (req, res)=>{
    try {
        const {customerId} = req.params;
        const cart = await Cart.findOne({where: {customerId}})

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"})
        }
        
        await Cart.destroy()

        res.status(200).json({
            message: "Cart deleted sucessfully"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const getCart = async (req, res)=>{
    try {
        const {customerId} = req.params;
        const cart = await Cart.findOne({where: {customerId}});

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            })
        }
        res.status(200).json({
            message: "Cart found", cart
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


module.exports = {
    createCart, 
    deleteCart, 
    getCart
}