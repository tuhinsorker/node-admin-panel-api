const dashboardModel = require("../models/dashboardModel");

const getDashboardData = (req, res, next) => {
    dashboardModel.getDashboardData((err, results) => {
        if (err) return next(err);
        return res.json({
            success: true,
            data: results,
            message: "Dashboard data retrieved",
        });
    });
};

module.exports = {getDashboardData};