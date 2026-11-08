const {Cart, Customer} = require('../models');

const createCart = async (req, res)=>{
    try {
        const {customerId} = req.params;
        const cust = await Customer.findByPk(customerId);

        if (!cust) {
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
        const allCart = await Cart.findAll();
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
        const {customerId} = req.params;
        const cart = await Cart.findByPk(customerId, {
            include: {
            model: Customer,
            as: 'customers',
            attributes: ['firstName', 'lastName','email' ]
            }
        });

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


module.exports = {
    createCart,
    getAllCart, 
    getCart,
    deleteCart
}