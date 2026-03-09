const CreditSale = require("../modules/creditsales");
const Procurement = require("../modules/procurement"); // stock model

// GET all credit sales
const getAllCreditSale = async (req, res) => {
  try {
    const data = await CreditSale.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// CREATE credit sale with stock check
const createCreditSale = async (req, res) => {
  try {
    const {
      produceName,
      branch,
      tonnage,
      sellingPrice,
      buyerName,
      salesAgentName,
      date,
      time
    } = req.body;

    // 1️⃣Find stock for this produce and branch
    const stock = await Procurement.findOne({ nameOfProduce: produceName, branch });

    if (!stock) {
      return res.status(404).json({
        success: false,
        message: "Product not found in stock for this branch"
      });
    }

    // 2️⃣ Check if enough stock
    if (stock.tonnage < tonnage) {
      return res.status(400).json({
        success: false,
        message: `Not enough stock available. Current stock: ${stock.tonnage} kg`
      });
    }

    // 3️⃣ Reduce stock
    stock.tonnage -= tonnage;
    await stock.save();

    // 4️⃣ Record the credit sale
    const data = await CreditSale.create({
      produceName,
      branch,
      tonnage,
      sellingPrice,
      buyerName,
      salesAgentName,
      date,
      time
    });

    res.status(201).json({
      success: true,
      data
    });

  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// GET credit sale by ID
const getCreditSaleById = async (req, res) => {
  try {
    const data = await CreditSale.findById(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Credit sale not found"
      });
    }

    res.json({
      success: true,
      data
    });

  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// UPDATE credit sale
const updateCreditSale = async (req, res) => {
  try {
    const updated = await CreditSale.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        returnDocument: "after",
        runValidators: true
      }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Credit sale not found"
      });
    }

    res.json({
      success: true,
      data: updated
    });

  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// DELETE credit sale
const deleteCreditSale = async (req, res) => {
  try {
    const deleted = await CreditSale.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Credit sale not found"
      });
    }

    res.json({
      success: true,
      message: "Credit sale deleted successfully"
    });

  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

module.exports = {
  getAllCreditSale,
  createCreditSale,
  getCreditSaleById,
  updateCreditSale,
  deleteCreditSale
};