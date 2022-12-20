const router = require('express').Router();
const bookRoutes = require('./bookRoutes');
const locationRoutes = require('./locationRoutes');

router.use('/bookroutes', bookRoutes);
router.use('/locationroutes', locationRoutes);

module.exports = router;
