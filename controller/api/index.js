const router = require('express').Router();
const bookRoutes = require('./bookRoutes');
const locationRoutes = require('./locationRoutes');

router.use('/book', bookRoutes);
router.use('/location', locationRoutes);

module.exports = router;