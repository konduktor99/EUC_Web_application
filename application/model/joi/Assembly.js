
const Joi = require('joi');


const errMessages = (errors) => {
    errors.forEach(err => {
        switch (err.code) {
            case "any.required":
                err.message = "Pole jest wymagane.";
                break;
            case "string.min":
                err.message = `Pole powinno zawierać co najmniej ${err.local.limit} znaki.`;
                break;
            case "string.max":
                err.message = `Pole powinno zawierać maksymalnie ${err.local.limit} znaki.`;
                break;
            case "string.length":
                err.message = `Pole powinno zawierać ${err.local.limit} znaki.`;
                break;
            case "number.min":
                err.message = `Wartość musi być większa niż ${err.local.limit}.`;
                break;
               
            case "date.max":
                err.message = "Data powinna być z przeszłości.";
                break;
            case "date.base":
                err.message = "Data musi być w formacie dd-mm-yyyy.";
                break;
            default:
            break;

        }
    });
    return errors;
}


const assemSchema = Joi.object({
   
    idAssembly: Joi.number()
   
    ,
    startDate: Joi.date()
    .empty('')
    .max("now")
    .required()
    .error(errMessages)
    ,
    endDate: Joi.date()
    .empty('')
    .required()
    .error(errMessages)
    ,
    price: Joi.number()
    .empty('')
    .min(0)
    .max(10000)
    .required()
    .error(errMessages)
    ,
    clientName: Joi.string()
    .empty('')
    .min(0)
    .max(25)
    .required()
    .error(errMessages)
    ,
    clientNumber: Joi.string()
    .empty('')
    .length(9)
    .required()
    .error(errMessages)
    ,
    clientRemarks: Joi.string()
    .empty('')
    .max(100)
    .error(errMessages)
    ,
    unicycle: Joi.any()
    .empty('')
    .error(errMessages)
    ,
    part: Joi.any()
    .empty('')
    .error(errMessages)
    ,
    idUnicycle: Joi.number()
    .empty('')
    .required()
    .error(errMessages)
    ,
    idPart: Joi.number()
    .empty('')
    .required()
    .error(errMessages)
    
   
    
});



module.exports = assemSchema;