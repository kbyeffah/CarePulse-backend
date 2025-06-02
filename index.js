import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import medicationRouter from "./router/medicationroutes.js";
import mongoose from "mongoose";
import symptomRouter from "./router/symptomsroutes.js";
import userRouter from "./router/userroutes.js";

// Load environment variables
dotenv.config();

// Create an express app
const app = express();

// Use global middlewares
app.use(express.json());
app.use(cors());

// Define root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to CarePulse AI Backend! Use /api/medications, /api/symptoms, or /api/users to access the API.' });
});

// Use routes
app.use('/api/medications', medicationRouter); 
app.use('/api/symptoms', symptomRouter);      
app.use('/api/users', userRouter);        

// Connect to MongoDB (using IIFE to handle async)
(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
})();

// Listen for incoming requests
const port = process.env.PORT || 4900;
app.listen(port, () => {
  console.log(`CarePulse AI server running on port ${port}`);
});