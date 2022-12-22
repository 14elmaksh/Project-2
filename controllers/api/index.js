const router = require('express').Router();

const bookRoutes = require('./bookRoutes');
const locationRoutes = require('./locationRoutes');

router.use('./books', bookRoutes);
router.use('./locations', locationRoutes);

module.exports = router;