const {Customer, Product, Cart, CartItem} = require('../models');

const createCustomer = async (req, res)=>{
    try {
        const {firstName, lastName, email,password} = req.body;
        const user = await Customer.findOne({where: {email}})
        if (user){
            return res.status(400).json({
                message: `Customer already exist!`
            })
        }
        const newCustomer = await Customer.create({
            firstName,
            lastName,
            email,
            password
        })
        res.status(201).json({
            message: `Customer created successfully!`,
            data: newCustomer

        })
    } catch (error) {
         res.status(500).json({
            message: error.message
        })
        
    }

}

const getAllCustomer = async (req, res)=>{
    try {
        const getAll = await Customer.findAll();
        res.status(200).json({
            message: `Customers found successfully and the number is: ${getAll.length}!`,
            data: getAll
        })
    } catch (error) {
         res.status(500).json({
            message: error.message
        })
        
    }
}

const getOneCustomer = async (req, res)=>{
   try {
         const {id} = req.params;
        const getOne = await Customer.findByPk(id, {
            attributes: ['firstName', 'lastName', 'email']
        });
        if (!getOne){
        return res.status(404).json({
            message: `Customer not found!`
        })
    }
         res.status(200).json({
            message: `Customer found successfully!`,
            data: getOne
    })
   } catch (error) {
        res.status(500).json({
            message: error.message
        })
        
   }

}

const updateCustomer = async (req, res) =>{
    try {
        const {id} = req.params;
        const {firstName, lastName, email, password}= req.body 

        const customer = await Customer.findByPk(id);
        if (!customer){
            return res.status(404).json({
                message: `Customer does not exist`
            })
        }
        const update = await Customer.update({
            firstName,
            lastName,
            email,
            password
        },{where: {id}})
        res.status(200).json({
            message: `Customer updated successfully`,
            data: update
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
        
    }
}

const deleteCustomer = async (req, res)=>{
    try {
        const {id} = req.params;
        const cust = await Customer.findByPk(id);
        if(!cust){
            return res.status(404).json({
                message: `Customer does not exist!`
            })
        }
        const customer = await Customer.destroy({where: {id}})
        res.status(200).json({
            message: `Customer deleted successfully!`,
            data: customer
        })

    } catch (error) {
         res.status(500).json({
            message: error.message
        })   
    }
}

const addToCart = async (req, res) => {
    try {

        const {id, productId} = req.params;
        const {firstName, lastName, name, description } = req.body
        const user = await Customer.findByPk(id)

        if (!user){
            return res.status(404).json({
                message: `Customer does not exist`
            })
        }
        const addtocart = await Cart.create({
            customerId: id,
            firstName,
            lastName,
            name,
            description,
            productId
        })
        res.status(200).json({
            message: `Added to cart successfully`,
            data: addtocart
        })
        
    } catch (error) {
          res.status(500).json({
            message: error.message
        })   
    }

}

const removeFromCart = async (req, res) =>{
    try {
        const {customerId}= req.params
        const user = await Customer.findOne({where: {customerId}})

        if (!user){
            return res.status(404).json({
                message: `Customer didnt place order`
            })
        }

        const removeCart = await Cart.destroy({where: {customerId}})
        res.status(200).json({
            message: `Cart deleted successfully`,
            data: removeCart
        })
    } catch (error) {
         res.status(500).json({
            message: error.message
        })   
    }
}

module.exports = {
    createCustomer,
    getAllCustomer,
    getOneCustomer,
    updateCustomer,
    deleteCustomer,
    addToCart,
    removeFromCart
}