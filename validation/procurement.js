const Joi = require("joi");
const createProcurementSchema = Joi.object({
  nameOfProduce: Joi.string().trim().required(),
  typeOfProduce: Joi.string().trim().required(),
  date: Joi.string().isoDate().required(),
  time: Joi.string().required(),
  tonnage: Joi.number().min(100).required(),
  cost: Joi.number().min(10000).required(),
  sellingPrice: Joi.number().min(10000).required(),
  dealerName: Joi.string().alphanum().min(2).required(),
  contact: Joi.string()
    .pattern(/^\+256\d{9}$/)
    .required(),
  branch: Joi.string().valid("Maganjo", "Matugga").required(),
});

module.exports = { createProcurementSchema };
