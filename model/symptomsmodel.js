
import { Schema, model, Types } from "mongoose";

import normalize from "normalize-mongoose";

const symptomsSchema = new Schema({
    area: { type: String, required: true },
    age: {type: Number, required: true},
    symptoms: {
    type: String, // Patient writes something like "Fever, cough, headache"
    required: true  },
    // pictures: [ {type: String, required: true }],

    // fever: {
    //   type: Boolean,np
    //   default: false
    // },
    // cough: {
    //   type: Boolean,
    //   default: false
    // },
    // headache: {
    //   type: Boolean,
    //   default: false
    // },
    // nausea: {
    //   type: Boolean,
    //   default: false
    // },

    // otherSymptoms: {type: String}, required: true,

    userId: {type:Types.ObjectId, required:true, ref: "User"},
    isDeleted: {type: Boolean, default: false},
    deletedAt: {type: Date, default: null},

}, {timestamps: true

});

symptomsSchema.plugin(normalize);
export const SymptomsModel = model('Symptom', symptomsSchema);