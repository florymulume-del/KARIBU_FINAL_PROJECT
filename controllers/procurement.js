const Procurement = require("../modules/procurement.js");
const getAllProcurement = async (req, res) => {
  try {
    const data = await Procurement.find().sort({ createdAt: -1 });

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
const getProcurementById = async (req, res) => {
  try {
    const procurement = await Procurement.findById(req.params.id);
    res.json(procurement);
  } catch (error) {
    res.status(500).json({ message: "Procurement not found" });
  }
}
const createProcurement = async (req,res)=>{
  try{
    const data = await Procurement.create(req.body);
    res.status(201).json({success:true, data});
  }catch(err){
    res.status(400).json({success:false,message:err.message});
  }
}

const updateProcurement = async (req,res)=>{
  try{
    const updated = await Procurement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument:"after", runValidators:true }
    );
    res.json({success:true, data:updated});
  }catch(err){
    res.status(400).json({success:false,message:err.message});
  }
}
const deleteProcurement =  async (req,res)=>{

  try{
    await Procurement.findByIdAndDelete(req.params.id);
    res.json({success:true,message:"Procurement deleted"});
  }catch(err){
    res.status(400).json({success:false,message:err.message});
  }
}
module.exports = {
    getAllProcurement,
    getProcurementById ,
    createProcurement,
    updateProcurement ,
    deleteProcurement
}