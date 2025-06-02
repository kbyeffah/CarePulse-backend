import { Router } from "express";
import { addSymptom, deleteSymptom, getOneSymptom, getSymptoms, replaceSymptom, updateSymptom } from "../controller/symptomcontroller.js";
import { isAuthenticated, isAuthorized } from "../middleware/auth.js";


const symptomRouter = Router();


// Define routes

// Add symptom
symptomRouter.post("/symptoms/submit",  isAuthenticated, isAuthorized(["patient", "doctor"]) , addSymptom);

// Get all symptoms
symptomRouter.get("/symptoms", getSymptoms);

// Update or Edit a symptom
symptomRouter.patch("/symptom/:id", isAuthenticated, isAuthorized(["doctor", "admin"]), updateSymptom);


// Replace symptoms
symptomRouter.put("/symptoms/:id", isAuthenticated, isAuthorized(["doctor", "admin"]), replaceSymptom);


// Get symtom by id
symptomRouter.get("/symptoms/:id", getOneSymptom);

// Delete symptom
symptomRouter.delete("/symptom/:id", isAuthenticated, isAuthorized(["doctor", "admin"]), deleteSymptom)


export default symptomRouter;

