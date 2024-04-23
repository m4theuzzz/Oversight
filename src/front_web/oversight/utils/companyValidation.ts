import Joi from "joi";

export const companySchema = {
  name: Joi.string().required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  cnpj: Joi.number().required(),
  phone: Joi.number().required(),
};
