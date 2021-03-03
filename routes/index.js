const express = require("express");
const router = express.Router();

const authRoutes = require('./auth')
const productRoutes = require('./product')
const transactionRoutes = require('./transaction')

router.get("/", (req, res) => {
  res.send("Hello World");
});
router.use('/auth', authRoutes)
router.use('/product', productRoutes)
router.use('/transaction', transactionRoutes)

module.exports = router;
