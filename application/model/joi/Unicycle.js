const Joi = require('joi');


const errMessages = (errors) => {
    errors.forEach(err => {
        switch (err.code) {
            case "any.required":
                err.message = "Pole jest wymagane.";
                break;
            case "string.min":
                err.message = `Pole powinno zawierać co najmniej ${err.local.limit} znaki`;
                break;
            case "string.max":
                err.message = `Pole powinno zawierać maksymalnie ${err.local.limit} znaków`;
                break;
            case "number.min":
            err.message = `Wartość musi być większa niż ${err.local.limit}`;
            break;
            default:
                break;
        }
    });
    return errors;
}


const uniSchema = Joi.object({
   
    idUnicycle: Joi.number()
    
    ,
    brand: Joi.string()
    .empty('')
    .min(0)
    .max(10)
    .required()
    .error(errMessages)
    ,
    model: Joi.string()
    .empty('')
    .min(0)
    .max(10)
    .required()
    .error(errMessages)
    ,
    price: Joi.number()
    .empty('')
    .min(0)
    .required()
    .error(errMessages)
    ,
    availableQuantity: Joi.number()
    .empty('')
    .min(0)
    .required()
    .error(errMessages)
    ,
    motorPower: Joi.number()
    .empty('')
    .required()
    .error(errMessages)
    ,
    batteryCapacity: Joi.number()
    .empty('')
    .required()
    .error(errMessages)
    ,
    tireDiameter: Joi.number()
    .empty('')
    .min(10)
    .required()
    .error(errMessages)
    ,
    waterproofRating: Joi.string()
    .empty('')
    .min(4)
    .max(4)
    .error(errMessages)
    ,
    parts: Joi.any()
    .empty('')
   
    
});



module.exports = uniSchema;