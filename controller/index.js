const router = require('express').Router();

const homeRoutes = requre("./home-routes.js");

router.use("/", homeRoutes)

module.exports = router;

