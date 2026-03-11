import express from "express";
import featuredController from "../controllers/featured.controller.js";
import { storage } from "../config/cloudinary.js";
import { 
  validateCreateFeatured, 
  validateUpdateFeatured,
  validateId 
} from "../validations/featured.validation.js";
import { authenticate, authorizeRole } from "../middleware/auth.middleware.js";
import multer from "multer";

const MAX_UPLOAD_MB = 15;
const upload = multer({
    storage,
    limits: { fileSize: MAX_UPLOAD_MB * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const isVideo = file.mimetype.startsWith("video/");
        const isImage = file.mimetype.startsWith("image/");

        if (file.fieldname === "file" && isVideo) return cb(null, true);
        if (file.fieldname === "picture" && isImage) return cb(null, true);

        return cb(new Error("Invalid file type. Only videos for file and images for picture are allowed."));
    }
});

const featuredRouter = express.Router();
const featuredCtr = new featuredController();

// CREATE — supports video + picture
featuredRouter.post(
    "/",
    upload.fields([
        { name: "file", maxCount: 1 },
        { name: "picture", maxCount: 1 }
    ]),
    validateCreateFeatured,
    authenticate,
    authorizeRole("admin"),
    featuredCtr.createFeatured
);

// UPDATE — supports updating both video + picture
featuredRouter.patch(
    "/:id",
    upload.fields([
        { name: "file", maxCount: 1 },
        { name: "picture", maxCount: 1 }
    ]),
    validateUpdateFeatured,
    authenticate,
    authorizeRole("admin"),
    featuredCtr.updateFeatured
);

// DELETE
featuredRouter.delete(
    "/:id",
    validateId,
    authenticate,
    authorizeRole("admin"),
    featuredCtr.deleteFeatured
);

// GET one
featuredRouter.get(
    "/:id",
    validateId,
    authenticate,
    authorizeRole("admin"),
    featuredCtr.getFeatured
);

// GET all
featuredRouter.get(
    "/",
    authenticate,
    authorizeRole("admin"),
    featuredCtr.getAllFeatured
);

export default featuredRouter;
