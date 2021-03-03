const express = require("express");
const router = express.Router();

const authRoutes = require('./auth')
const productRoutes = require('./product')

router.get("/", (req, res) => {
  res.send("Hello World");
});
router.use('/auth', authRoutes)
router.use('/product', productRoutes)

module.exports = router;
