
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Uploading images for symptoms (using multer)
export const symptomPicturesUpload = multer({
  storage: new CloudinaryStorage({
    cloudinary,
    params: {
      folder: "apomudenCare-api/symptom-pictures",
    },
  }),
});



// Uploading images for profile pictures (using multer)
export const profilePicturesUpload = multer({
  storage: new CloudinaryStorage({
    cloudinary,
    params: {
      folder: "apomudenCare-api/profile-pictures",
    },
  }),
});


// // Uploading images for listings (using multer)
// export const profilePictureUpload = multer({
//   storage: new CloudinaryStorage({
//     cloudinary,
//     params: {
//       folder: "apomudenCareProfile-api/profile-pictures",
//     },
//   }),
// });


// export const profilePictureUpload = multer({
//   storage: new CloudinaryStorage({
//     cloudinary,
//     params: (req, file) => ({
//       folder: "apomudenCareProfile-api/profile-pictures",
//       public_id: `${Date.now()}-${file.originalname}`,
//     }),
//   }),
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype.startsWith("image/")) {
//       cb(null, true);
//     } else {
//       cb(new Error("Only image files are allowed"), false);
//     }
//   },
//   limits: { fileSize: 2 * 1024 * 1024 }, // 2MB size limit
// });