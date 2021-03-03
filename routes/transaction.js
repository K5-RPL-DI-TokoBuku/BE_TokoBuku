const express = require("express");
const router = express.Router();
const TransactionController = require("../controllers/transactionController");

router.post("/charge", TransactionController.sendChargeRequestToMidtrans);

module.exports = router;
