import Joi from "joi";

export const registerUserValidator = Joi.object({
 username: Joi.string().alphanum().min(3).max(30).required(),
  firstName: Joi.string()
    .regex(/^[A-Za-z]+$/)
    .required(),
  lastName: Joi.string()
    .regex(/^[A-Za-z]+$/)
    .required(),
    telephoneNumber: Joi.string().required(),
    
  email: Joi.string().email({ tlds: { allow: ['com', 'org', 'net'] } }).required(),
  password: Joi.string().required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")),

//   upload profile picture 
   profilePicture: Joi.string()
  .pattern(/\.(jpg|jpeg|png|gif)$/i)
  .uri({ allowRelative: true })
  .optional(),
    specialty: Joi.string().optional(),

  // role is optional, it is set to default user if it is not indicated or selected.
  role: Joi.string().valid("patient", "nurse", "doctor").optional(),
}).with("password", "confirmPassword");

export const loginUserValidator = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export const updateUserValidator = Joi.object({
  username: Joi.string().optional(),
  firstName: Joi.string()
    .regex(/^[A-Za-z]+$/)
    .optional(),
  lastName: Joi.string()
    .regex(/^[A-Za-z]+$/)
    .optional(),
  email: Joi.string().optional(),
  password: Joi.string().optional(),
  confirmPassword: Joi.string().optional(),
  role: Joi.string().valid("patient", "nurse","doctor"),
  telephoneNumber: Joi.string().optional(),
   profilePicture: Joi.string()
  .pattern(/\.(jpg|jpeg|png|gif)$/i)
  .uri({ allowRelative: true })
  .optional(),
    specialty: Joi.string().optional(),
});
