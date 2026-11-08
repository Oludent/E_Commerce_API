const Joi = require('joi');

const createProductValidation = (req, res, next) => {
    const productSchema = Joi.object({
        name: Joi.string().required().messages({
                    "any.required": "Name is required",
                    "string.empty": "Name cannot be empty"
                }),
        description: Joi.string().required().messages({
                    "any.required": "Description is required",
                    "string.empty": "Description cannot be empty",
                }),        
        price: Joi.string().trim().pattern(new RegExp('^[0-9]+(\.[0-9]{1,2})?$')).required().messages({
            'any.required': 'Price is required',
            'string.empty': 'Price cannot be empty',
            'string.pattern.base': 'Price must be a valid number with up to 2 decimal places'
        }),
        stockQuantity:  Joi.string().trim().pattern(new RegExp('^[0-9]+(\.[0-9]{1,2})?$')).required().messages({
            'any.required': 'Stock quantity is required',
            'string.empty': 'Stock quantity cannot be empty',
            'string.pattern.base': 'Stock quantity must be a valid number with up to 2 decimal places'
        })
    })

    const {error} = productSchema.validate(req.body)
    if(error){
        return res.status(400).json({
            message: error.details[0].message
        })
    }

    next();

}

module.exports = {
    createProductValidation
}