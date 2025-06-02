import Joi from "joi";

// Create symptoms vadidator

export const symptomValidator =  Joi.object({
    area: Joi.string().required(),
    age: Joi.number().required(),
    symptoms: Joi.string().required(),
  
    // pictures:Joi.array().items(Joi.string().required()),
    

});


// Update symptom validator
export const updateSymptomValidator = Joi.object({
    area: Joi.string().optional(),
    age: Joi.number().optional(),
    symptoms: Joi.string().optional(),
    // pictures:Joi.array().items(Joi.string().required()),
    // specialty: Joi.string().required(),
    
});

// id validator

export const symptomIdValidator = Joi.object({
  id: Joi.string().required()
});