import Joi from "joi";

const colorSchema = {
  color: Joi.string().valid(
    "neutral",
    "primary",
    "secondary",
    "accent",
    "info",
    "success",
    "warning",
    "error"
  ),
};

export default colorSchema;
