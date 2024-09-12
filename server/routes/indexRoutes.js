const express = require('express');
const employeeRoutes = require('./userRoutes');

const router = express.Router();


 
router.use('/v1',employeeRoutes)

module.exports = router;