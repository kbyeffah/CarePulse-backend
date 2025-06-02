import express from "express";

import dotenv from "dotenv"
import cors from "cors"
import medicationRouter from "./router/medicationroutes.js";
import mongoose from "mongoose";
import symptomRouter from "./router/symptomsroutes.js";
import userRouter from "./router/userroutes.js";


// Load environment Variables 
dotenv.config();




// make database connection
await mongoose.connect(process.env.MONGO_URI);



//Create an express app
const app = express(); 



// Use global middlewares
app.use(express.json());
app.use(cors());

//Use routes
app.use(medicationRouter);
app.use(symptomRouter);
app.use(userRouter);



//Listen for incoming request
const port = process.env.PORT || 4900;
app.listen(port, () => {
  console.log(`CarePulse AI server running on port ${port}`);
});
