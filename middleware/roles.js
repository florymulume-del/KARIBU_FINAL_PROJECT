exports.managerOnly = (req, res, next) => {
  if (req.user.role !== "manager") {
    return res.status(403).json({
      message: "Managers only"
    });
  }
  next();
};

exports.salesOnly = (req, res, next) => {
  if (req.user.role !== "Sales Agent") {
    return res.status(403).json({
      message: "Sales Agents only"
    });
  }
  next();
};
exports.directorOnly = (req, res, next) => {
  if (req.user.role !== "Director") {
    return res.status(403).json({
      message: "director only"
    });
  }
  next();
};