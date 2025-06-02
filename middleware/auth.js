import { UserModel } from "../model/usermodel.js";
import { expressjwt } from "express-jwt";
import dotenv from "dotenv";

// Authenticate user at the signup / registration stage

export const isAuthenticated = expressjwt({
  secret: process.env.JWT_SECRET_KEY || "default_secret",
  algorithms: ["HS256"],
  requestProperty: "auth" , 
  // The code above attaches token payload to req.auth
});


// Check user roles for auhtorization 
export const isAuthorized = (roles) => {
  return async (req, res, next) => {
    try {
      
      const user = await UserModel.findById(req.auth?.id);
      if(!user){
        res.status(404).json("User not found")
      }
  
      if (roles?.includes(user.role)) {
        next();
      } else {
        res.status(403).json("You have to be Authorized");
      }
    } catch (error) {
      
      res.status(500).json("Internal Server Error")
    }
  };
};
