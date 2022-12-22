const router = require('express').Router();
const bookRoutes = require('./bookRoutes');
const locationRoutes = require('./locationRoutes');
const contactRoutes = require('./contactRoutes');

router.use('/book', bookRoutes);
router.use('/location', locationRoutes);
router.use('/contact', contactRoutes);

module.exports = router;