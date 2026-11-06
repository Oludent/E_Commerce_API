const Joi = require('joi');

const createCustomerValidation = (req, res, next) => {
    const customerSchema = Joi.object({
         firstName: Joi.string().trim().pattern(new RegExp("^[A-Za-z]{3,}$")).required().messages({
            "any.required": "First name is required",
            "string.empty": "First name cannot be empty",
            "string.pattern.base": "First name must be Letters Only, and must be at least 3 characters"

        }),
        lastName: Joi.string().trim().pattern(new RegExp("^[A-Za-z]{3,}$")).required().messages({
            "any.required": "Last name is required",
            "string.empty": "Last name cannot be empty",
            "string.pattern.base": "Last name must contain Letter Only and must be at least 3 characters "
        }),
        email: Joi.string().trim().email().required().messages({
            "any.required": "Email is required",
            "string.empty": "Email cannot be empty",
            "string.email": "Email must be a valid email address"
        }),
        password: Joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
)).required().messages({
            "any.required": "Password is required",
            "string.empty": "Password is not allowed to be empty",
            "string.pattern.base": "Password must contain at least a Lowercase, Uppercase,Digit and a Special Character and must be at least 8 Characters"
        })
    })

    const {error} = customerSchema.validate(req.body)
    if(error){
        return res.status(400).json({
            message: error.details[0].message
        })
    }

    next();

}

module.exports = {
    createCustomerValidation
}