const Sale = require("../modules/sales");
const Procurement = require("../modules/procurement");

 const getAllSales = async (req, res) => {
  try {
    const data = await Sale.find().sort({ createdAt: -1 });

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
}
const getSaleById = async (req, res) => {
  try {
    const data = await Sale.findById(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Sale not found"
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
}

const createSale = async (req, res) => {
  try {
    const {
      produceName,
      branch,
      tonnage,
      sellingPrice,
      amountPaid,
      buyerName,
      salesAgentName,
      date,
      time
    } = req.body;

    // Find stock for this produce and branch
    const stock = await Procurement.findOne({ nameOfProduce: produceName, branch });

    if (!stock) {
      return res.status(404).json({
        success: false,
        message: "Product not found in stock for this branch"
      });
    }

    // Check if enough stock
    if (stock.tonnage < tonnage) {
      return res.status(400).json({
        success: false,
        message: `Not enough stock available. Current stock: ${stock.tonnage} kg`
      });
    }

    // Reduce stock
    stock.tonnage -= tonnage;
    await stock.save();

    // Record the sale
    const sale = await Sale.create({
      produceName,
      branch,
      tonnage,
      sellingPrice,
      amountPaid,
      buyerName,
      salesAgentName,
      date,
      time
    });

    res.status(201).json({
      success: true,
      data: sale
    });

  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};
const updateSale = async (req, res) => {
  try {
    const updated = await Sale.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,           // return updated document
        runValidators: true
      }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Sale not found"
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
}
const deleteSale = async (req, res) => {
  try {
    const deleted = await Sale.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Sale not found"
      });
    }

    res.json({
      success: true,
      message: "Sale deleted successfully"
    });

  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
}
module.exports = {
    getAllSales,
    getSaleById,
    createSale,
    updateSale,
    deleteSale
}