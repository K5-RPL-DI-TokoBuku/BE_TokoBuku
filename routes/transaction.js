const express = require("express");
const router = express.Router();
const TransactionController = require("../controllers/transactionController");

router.post("/charge", TransactionController.sendChargeRequestToMidtrans);
router.post("/createTransaksi", TransactionController.createTransaksi);
router.get("/", TransactionController.readTransactions);
router.get("/:id", TransactionController.readTransactionsById);
router.delete("/:id", TransactionController.deleteTransaction);



module.exports = router;
