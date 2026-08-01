const { getAdminSummary } = require("../services/adminService");

const adminSummary = async (req, res) => {
    try {
        const summary = await getAdminSummary(req.user);
        res.json(summary);
    } catch (err) {
        if (err.message === "Not authorized") {
            return res.status(403).json({
                message: err.message,
            });
        }

        res.status(500).json({
            message: err.message,
        });
    }
};

module.exports = { adminSummary };