import { Schema, model, Types } from "mongoose";

import normalize from "normalize-mongoose";


const medicationSchema = new Schema({
    name: { type: String, required: true, unique: true },
    uses: {type: String, required: true},
   
    dosage: {type: String, required: true  },
    sideEffects: {type: String, required: true  },
    instructions: {type: String, required: true },
    precautions: {type: String, required: true },
    userId: {type:Types.ObjectId, required:true, ref: "User"},
    isDeleted: {type: Boolean, default: false},
    deletedAt: {type: Date, default: null},

}, {timestamps: true

});


medicationSchema.plugin(normalize);

export const MedicationModel = model("Medication", medicationSchema);

