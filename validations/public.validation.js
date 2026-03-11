import validate from "../middleware/validate.middleware.js";
import { validators } from "./common.validators.js";

export const validatePublicEmail = [
  ...validators.bodyString("name"),
  ...validators.email("email"),
  ...validators.bodyString("message"),
  validate,
];
