const {
  getDashboard,
} = require("../services/dashboardService");

const getUserDashboard = async (req, res) => {
  try {
    const dashboard = await getDashboard(
      req.user.id
    );

    res.json(dashboard);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }
};

module.exports = {
  getUserDashboard,
};