const Joi = require("joi");

const createCreditSaleSchema = Joi.object({
  produceName: Joi.string().trim().required(),
  branch: Joi.string().valid("Maganjo", "Matugga").required(),
  tonnage: Joi.number().min(1).required(),
  sellingPrice: Joi.number().min(1000).required(),
  buyerName: Joi.string().alphanum().min(2).required(),
  salesAgentName: Joi.string().alphanum().min(2).required(),
  date: Joi.string().isoDate().required(),
  time: Joi.string().required()
});

module.exports = { createCreditSaleSchema };