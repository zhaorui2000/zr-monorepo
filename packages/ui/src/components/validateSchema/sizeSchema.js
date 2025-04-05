import Joi from "joi";

const sizeSchema = {
  size: Joi.string().valid("xs", "sm", "md", "lg", "xl").when("responsive", {
    is: true,
    then: Joi.forbidden(),
  }),
  responsive: Joi.boolean().default(false),
};

export default sizeSchema;
