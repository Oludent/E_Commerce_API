const {Cart, Customer} = require('../models');

const createCart = async (req, res)=>{
    try {
        const {customerId} = req.params;
        const customer = await Customer.findByPk(customerId);

        if (!customer) {
            return res.send("Customer added cart already")
        }
        const newCart = await Cart.create({
            customerId,
        })

        res.status(200).json({
            message: "Cart created successfully", 
            data: newCart
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const getAllCart = async (req, res)=> {
    try {
        const allCart = await Cart.findAll({
            attributes: ['id', 'customerId']
        });
        res.status(200).json({
            message: `Carts found successfully and the number is: ${allCart.length}`,
            data: allCart
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


const getCart = async (req, res)=>{
    try {
        const {id} = req.params;
        const cart = await Cart.findByPk(id,{attributes: ['id', 'customerId', ]})

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            })
        }
        res.status(200).json({
            message: "Cart found", 
            data: cart
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const deleteCart = async (req, res)=>{
    try {
        const {id} = req.params;
        const cart = await Cart.findOne({where: {id}})

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


module.exports = {
    createCart,
    getAllCart, 
    getCart,
    deleteCart
}