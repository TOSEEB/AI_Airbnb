const requireRole = (...roles) => (req, res, next) => {
  const role = req.user?.role;

  if (!roles.includes(role)) {
    return res.status(403).json({
      message: "Not authorized",
    });
  }

  next();
};

module.exports = requireRole;
