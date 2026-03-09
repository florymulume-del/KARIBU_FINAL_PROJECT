const express = require("express");
const router = express.Router();
const Procurement = require("../modules/procurement");
const auth = require("../middleware/auth");
const validate = require("../middleware/validate");
const { createProcurementSchema } = require("../validation/procurement");
const { managerOnly } = require("../middleware/roles");
const {
  getProcurementById,
  getAllProcurement,
  createProcurement,
  updateProcurement,
  deleteProcurement,
} = require("../controllers/procurement.js");

router.get("/:id", auth, managerOnly, getProcurementById);
// CREATE (Managers only)
router.post("/", auth, managerOnly,validate(createProcurementSchema), createProcurement);
router.get("/", auth, getAllProcurement);
// UPDATE (Managers only)
router.put("/:id", auth, managerOnly, updateProcurement);
// DELETE (Managers only)
router.delete("/:id", auth, managerOnly, deleteProcurement);

module.exports = router;
