import validate from "../middleware/validate.middleware.js";
import { validators } from "./common.validators.js";

export const validateCreateFeatured = [
    ...validators.bodyString('title'),
    validate
];

export const validateUpdateFeatured = [
    ...validators.paramObjectId('id'),
    ...validators.bodyString({field: 'title', optional: true}),
    ...validators.bodyString({field: 'description', optional: true}),
    ...validators.bodyLink({field: 'link', optional: true}),
    ...validators.bodyEnums({field: 'serviceType', values: ['business_website', 'internal_tool', 'automated_workflow'], optional: true}),
    ...validators.bodyEnums({field: 'status', values: ['draft', 'published'], optional: true}),
    validate
];

export const validateId = [
    ...validators.paramObjectId('id'),
    validate
];
