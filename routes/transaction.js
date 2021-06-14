const express = require("express");
const router = express.Router();
const TransactionController = require("../controllers/transactionController");

router.post("/charge", TransactionController.sendChargeRequestToMidtrans);
router.post("/createTransaksi", TransactionController.createTransaksi);
router.get("/", TransactionController.readTransactions);
router.get("/:id", TransactionController.readTransactionsById);
router.delete("/:id", TransactionController.deleteTransaction);
router.post('/get_city_in_province', TransactionController.getCityInProvince);


router.post('/check_ongkir', TransactionController.checkOngkir);

router.post('/buat_transaksi', TransactionController.buatTransaksi);

module.exports = router;
