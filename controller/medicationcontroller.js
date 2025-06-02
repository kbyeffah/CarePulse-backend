
import { MedicationModel } from "../model/medicationmodel.js";

import { medicationIdValivator, medicationValidator, updateMedicationValidator } from "../validator/medicationvalidator.js";


/// Posting a symptom
// Posting or adding a listing
export const addMedication = async (req, res) => {
  try {
    // Validate the incoming request
    const { error, value } = medicationValidator.validate(
      {
        ...req.body,
      },
      { abortEarly: false }
    );

    if (error) {
      console.log("Validation error details:", error.details);
      return res.status(422).json({
        message: "Validation unsuccessful",
        errors: error.details, // Include validation errors in the response
        status: "error",
      });
    }

    // Ensure the user is authenticated
    if (!req.auth?.id) {
      return res.status(401).json({
        message: "User is not authenticated",
        status: "error",
      });
    }

    // Save the listing details to the database
    const result = await MedicationModel.create({
      ...value,
      userId: req.auth.id,
    });

    return res.status(201).json(result); // Success response
  } catch (error) {
    console.error("Error occurred in adding your medication:", error);

    if (error.name === "MongooseError") {
      return res.status(409).json({
        message: "Request not successful, Internal server error",
        status: "error",
      });
    }

    return res.status(500).json({
      message: "Unexpected server error",
      status: "error",
    });
  }
};


// View or get all medications using the search and filter

export const getMedication = async (req, res) => {
  try {
    const { filter = "{}", sort = "{}" } = req.query;

    const result = await MedicationModel.find({
      ...JSON.parse(filter),
      isDeleted: false,
    }).sort(JSON.parse(sort));
    if (result.length === 0) {
      return res.status(404).json({ message: "No medication found" });
    }

    return res.json({
      message: "Here are your medications",
      data: result,
    });
  } catch (error) {
    return res.json({
      message: "Request unsuccessful, kindly reload the page ",
      status: "error",
    });
  }
};

export const medicationsByUser = async (req, res) => {
  try {
    const { filter = "{}", sort = "{}" } = req.query;

    const result = await MedicationModel.find({
      ...JSON.parse(filter),
      userId: req.params.userId,
      isDeleted: false,
    }).sort(JSON.parse(sort));

    if (result.length === 0) {
      return res.status(404).json({ message: "No medication found" });
    }
    res.json({
      message: "Here are your medications",
      data: result,
    });
  } catch (error) {
    return res.json({
      message: "Request not successful, kinldy refresh you page",
      status: "error",
    });
  }
};

//  Get one Medication  or Get medication by ID

export const getOneMedication = async (req, res) => {
  try {
    const { error, value } = medicationIdValivator.validate(req.params, {
      abortEarly: false,
    });

    if (error) {
      return res
        .status(400)
        .json({ message: "Validation unsuccessful", status: "error" });
    }
    const result = await MedicationModel.findById(value.id);
    if (!result) {
      return res.status(404).json({ message: "No medications found" });
    }
    res.json(result);
  } catch (error) {
    return res.json({
      message: " Request unsuccessful, kindly refresh your application",
    });
  }
};

//  Update/Patch medication

export const updateMedication = async (req, res) => {
  try {
    const { error, value } = updateMedicationValidator.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res.status.json({
        message: "Validation Unsuccessful",
        status: "error",
      });
    }

    // Find listing by Id
    const confirmListing = await MedicationModel.findById(req.params.id);
    if (!confirmListing) {
      return res
        .status(400)
        .json({ message: "Medication not found", status: "error" });
    }

    // confirm that the authenticated owner is the rightful owner of the listing
    if (confirmListing.userId.toString() !== req.auth.id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this medication" });
    }

    //    continue / proceed to update the advert

    const result = await MedicationModel.findByIdAndUpdate(req.params.id, value, {
      new: true,
    });

    if (!result) {
      return res.json({ message: "Medication not found", status: "error" });
    }

    res.status(200).json({
      message: "Medication successfully updated",
      data: result,
      status: "success",
    });
  } catch (error) {
    return res
      .status(404)
      .json({
        message: "Request unsuccessful,kindly refresh your application",
        status: "error",
      });
  }
};

// Put/ Replace med
export const replaceMedication = async (req, res) => {
  try {
    const { error, value } = medicationValidator.validate(req.params, {
      abortEarly: false,
    });
    if (error) {
      return res
        .status(400)
        .json({ message: "Validation Unsuccessful", status: "error" });
    }

    const confirmListing = await MedicationModel.findById(req.params.id);
    if (!confirmListing) {
      return res.status(404).json({ message: "Medication not found" });
    }
    if (confirmListing.userId.toString() !== req.auth.id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this medication" });
    }

    const result = await MedicationModel.findByIdAndUpdate(req.params.id, value, {
      new: true,
    });
    if (!result) {
      return res.status(404).json("Medication not found");
    }
    res.status(201).json({
      message: "Medication successfully updated",
      data: result,
    });
  } catch (error) {
    return res.json({
      message: "Request unsuccessful, kindly refresh your application",
    });
  }
};

// Delete medication

export const deleteMedication = async (req, res) => {
  try {
    const { error, value } = medicationIdValivator.validate(req.params, {
      abortEarly: false,
    });
    if (error) {
      return res
        .status(400)
        .json({ message: "Validation unsuccessful", status: "error" });
    }

    const confirmListing = await MedicationModel.findById(value.id);
    if (!confirmListing) {
      return res.status(400).json({ message: "Symptom not found" });
    }

    if (!req.auth || confirmListing.userId.toString() !== req.auth.id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this symptom" });
    }

    const result = await MedicationModel.findByIdAndUpdate(
      value.id,
      { isDeleted: true, deletedAt: new Date() },
      { new: true }
    );
    if (!result) {
      return res.status(404).json({ message: "Medication not found" });
    }

    res.status(202).json({
      message: "Medication deleted",
      data: result,
      status: "success",
    });
  } catch (error) {
    console.error("Delete medication error:",error);
    return res
      .status(500)
      .json({
        message: "Request unsuccessful, kindly refresh your application",
        status: "error",
      });
  }
};


