const router = require('express').Router();
const userRoutes = require("./userRoutes");
const subjectRoutes = require("./subjectRoutes") 

router.use('/users', userRoutes);
router.use('/subjects', subjectRoutes);

module.exports = router;
