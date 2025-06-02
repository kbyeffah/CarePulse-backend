import { Router } from "express";
import { addMedication, deleteMedication, getMedication, getOneMedication, replaceMedication, updateMedication } from "../controller/medicationcontroller.js";
import { isAuthenticated , isAuthorized} from "../middleware/auth.js";


const medicationRouter = Router();


// Define routes

// Add symptom
medicationRouter.post("/medications/info",  isAuthenticated, isAuthorized(["nurse", "doctor"]) , addMedication);

// Get all symptoms
medicationRouter.get("/medications/info", getMedication);

// Update or Edit a symptom
medicationRouter.patch("/medications/info/:id", isAuthenticated, isAuthorized(["doctor", "admin"]), updateMedication);


// Replace symptoms
medicationRouter.put("/medications/info/:id", isAuthenticated, isAuthorized(["doctor", "admin"]), replaceMedication);


// Get symtom by id
medicationRouter.get("/medications/info/:id", isAuthenticated, isAuthorized(["doctor", "admin"]), getOneMedication);

// Delete symptom
medicationRouter.delete("/medications/info/:id", isAuthenticated, isAuthorized(["doctor", "admin"]),  deleteMedication)


export default medicationRouter;
