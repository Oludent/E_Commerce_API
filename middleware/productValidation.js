const Joi = require('joi');

const createProductValidation = (req, res, next) => {
    const productSchema = Joi.object({
         price: Joi.number().positive().pattern(new RegExp('^[0-9]+(\.[0-9]{1,2})?$')).required().messages({
            'any.required': 'Price is required',
            'number.empty': 'Price cannot be empty',
            'number.positive': 'Price must be a positive number',
            'number.pattern.base': 'Price must be a valid number with up to 2 decimal places'
        }),
        stockQuantity:  Joi.number().positive().pattern(new RegExp('^[0-9]+(\.[0-9]{1,2})?$')).required().messages({
            'any.required': 'Price is required',
            'number.empty': 'Price cannot be empty',
            'number.positive': 'Price must be a positive number',
            'number.pattern.base': 'Price must be a valid number with up to 2 decimal places'
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