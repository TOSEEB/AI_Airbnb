const {
  getAdminSummary,
  updateUserRole,
  removeStayAsAdmin,
} = require("../services/adminService");

const adminSummary = async (req, res) => {
  try {
    const summary = await getAdminSummary();
    res.json(summary);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const changeUserRole = async (req, res) => {
  try {
    const user = await updateUserRole(
      req.params.id,
      req.body.role,
      req.user.id
    );
    res.json({ user, message: "Role updated" });
  } catch (err) {
    if (
      err.message === "Role must be guest, host, or admin" ||
      err.message === "Cannot demote the last admin"
    ) {
      return res.status(400).json({
        message: err.message,
      });
    }

    if (err.message === "User not found") {
      return res.status(404).json({
        message: err.message,
      });
    }

    res.status(500).json({
      message: err.message,
    });
  }
};

const takeDownStay = async (req, res) => {
  try {
    await removeStayAsAdmin(req.params.id);
    res.json({ message: "Stay removed" });
  } catch (err) {
    if (err.message === "Stay not found") {
      return res.status(404).json({
        message: err.message,
      });
    }

    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  adminSummary,
  changeUserRole,
  takeDownStay,
};
