import { SymptomsModel } from "../model/symptomsmodel.js";
import {
  symptomIdValidator,
  symptomValidator,
  updateSymptomValidator,
} from "../validator/sypmtomsvalidator.js";

// Posting a symptom
// Posting or adding a listing
export const addSymptom = async (req, res) => {
  try {
    // Validate the incoming request
    const { error, value } = symptomValidator.validate(
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
    const result = await SymptomsModel.create({
      ...value,
      userId: req.auth.id,
    });

    return res.status(201).json(result); // Success response
  } catch (error) {
    console.error("Error occurred in adding your symptoms:", error);

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


// View or get all listings using the search and filter

export const getSymptoms = async (req, res) => {
  try {
    const { filter = "{}", sort = "{}" } = req.query;

    const result = await SymptomsModel.find({
      ...JSON.parse(filter),
      isDeleted: false,
    }).sort(JSON.parse(sort));
    if (result.length === 0) {
      return res.status(404).json({ message: "No symptoms found" });
    }

    return res.json({
      message: "Here are your symptoms",
      data: result,
    });
  } catch (error) {
    return res.json({
      message: "Request unsuccessful, kindly reload the page ",
      status: "error",
    });
  }
};

export const symptomsByUser = async (req, res) => {
  try {
    const { filter = "{}", sort = "{}" } = req.query;

    const result = await SymptomsModel.find({
      ...JSON.parse(filter),
      userId: req.params.userId,
      isDeleted: false,
    }).sort(JSON.parse(sort));

    if (result.length === 0) {
      return res.status(404).json({ message: "No symptoms found" });
    }
    res.json({
      message: "Here are the symptoms",
      data: result,
    });
  } catch (error) {
    return res.json({
      message: "Request not successful, kinldy refresh you page",
      status: "error",
    });
  }
};

//  Get one listing

export const getOneSymptom = async (req, res) => {
  try {
    const { error, value } = symptomIdValidator.validate(req.params, {
      abortEarly: false,
    });

    if (error) {
      return res
        .status(400)
        .json({ message: "Validation unsuccessful", status: "error" });
    }
    const result = await SymptomsModel.findById(value.id);
    if (!result) {
      return res.status(404).json({ message: "No symptoms found" });
    }
    res.json(result);
  } catch (error) {
    return res.json({
      message: " Request unsuccessful, kindly refresh your application",
    });
  }
};

//  Update/Patch listing

export const updateSymptom = async (req, res) => {
  try {
    const { error, value } = updateSymptomValidator.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res.status.json({
        message: "Validation Unsuccessful",
        status: "error",
      });
    }

    // Find listing by Id
    const confirmListing = await SymptomsModel.findById(req.params.id);
    if (!confirmListing) {
      return res
        .status(400)
        .json({ message: "Symptoms not found", status: "error" });
    }

    // confirm that the authenticated owner is the rightful owner of the listing
    if (confirmListing.userId.toString() !== req.auth.id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this listing" });
    }

    //    continue / proceed to update the advert

    const result = await SymptomsModel.findByIdAndUpdate(req.params.id, value, {
      new: true,
    });

    if (!result) {
      return res.json({ message: "Symptom not found", status: "error" });
    }

    res.status(200).json({
      message: "Symptom successfully updated",
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

// Put/ Replace Listing
export const replaceSymptom = async (req, res) => {
  try {
    const { error, value } = symptomValidator.validate(req.params, {
      abortEarly: false,
    });
    if (error) {
      return res
        .status(400)
        .json({ message: "Validation Unsuccessful", status: "error" });
    }

    const confirmListing = await SymptomsModel.findById(req.params.id);
    if (!confirmListing) {
      return res.status(404).json({ message: "Symptom not found" });
    }
    if (confirmListing.userId.toString() !== req.auth.id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this symptom" });
    }

    const result = await SymptomsModel.findByIdAndUpdate(req.params.id, value, {
      new: true,
    });
    if (!result) {
      return res.status(404).json("Symptom not found");
    }
    res.status(201).json({
      message: "Symptom successfully updated",
      data: result,
    });
  } catch (error) {
    return res.json({
      message: "Request unsuccessful, kindly refresh your application",
    });
  }
};

// Delete symptom

export const deleteSymptom = async (req, res) => {
  try {
    const { error, value } = symptomIdValidator.validate(req.params, {
      abortEarly: false,
    });
    if (error) {
      return res
        .status(400)
        .json({ message: "Validation unsuccessful", status: "error" });
    }

    const confirmListing = await SymptomsModel.findById(value.id);
    if (!confirmListing) {
      return res.status(400).json({ message: "Symptom not found" });
    }

    if (!req.auth || confirmListing.userId.toString() !== req.auth.id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this symptom" });
    }

    const result = await SymptomsModel.findByIdAndUpdate(
      value.id,
      { isDeleted: true, deletedAt: new Date() },
      { new: true }
    );
    if (!result) {
      return res.status(404).json({ message: "Listing not found" });
    }

    res.status(202).json({
      message: "Symptom deleted",
      data: result,
      status: "success",
    });
  } catch (error) {
    console.error("Delete symptom error:",error);
    return res
      .status(500)
      .json({
        message: "Request unsuccessful, kindly refresh your application",
        status: "error",
      });
  }
};


