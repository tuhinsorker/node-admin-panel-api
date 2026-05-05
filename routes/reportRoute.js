const express = require('express');
const router = express.Router();
const checkRole = require('../middleware/role');
const auth = require("../middleware/auth");
const reportController = require('../controllers/reportController');



router.get(
    "/admin/report",
    auth,
    checkRole('admin'),
    reportController.report
);


module.exports = router;