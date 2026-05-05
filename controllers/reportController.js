const { successResponse, errorResponse } = require('../utils/response');
const reportModel = require('../models/reportModel');
const { validationResult } = require("express-validator");

const report = (req, res, next ) => {
    const { from, to } = req.query;
    if (!from || !to) {
        return errorResponse(res, "Date range required", {}, 400);
    }

    try{
        reportModel.getReport(
            from, to,
            (err,result)=>{
                if(err) return next(err);
                successResponse(
                    res,
                    result[0],
                    'report data'
                )
            }
        )
    } catch (error) {
        console.error(error);
        next(error);
    }
}



module.exports = {report};