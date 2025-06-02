import Joi from "joi";


// Create Medication Validator 


export const medicationValidator =  Joi.object({
  name: Joi.string().required(),
  
  uses: Joi.string().required(),
  dosage: Joi.string().required(),
  instructions: Joi.string().required(),
//   pictures:Joi.array().items(Joi.string().required()),
  sideEffects: Joi.string().required(),
  precautions: Joi.string().required(),
});



export const updateMedicationValidator = Joi.object({
     name: Joi.string().optional(),
  
  uses: Joi.string().optional(),
   dosage: Joi.string().optional(),
   instructions: Joi.string().optional(),
//   pictures:Joi.array().items(Joi.string().required()),
  sideEffects: Joi.string().optional(),
  precautions: Joi.string().optional(),
})


export const medicationIdValivator = Joi.object({
     id: Joi.string().required()
})