const router = require('express').Router();
const userRoutes = require("./userRoutes");
const subjectRoutes = require("./subjectRoutes");
const dashboardRoutes = require("./dashboardRoutes");


router.use('/users', userRoutes);
router.use('/subject', subjectRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;
