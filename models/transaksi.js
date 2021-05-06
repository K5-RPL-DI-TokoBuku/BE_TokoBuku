const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let transaksiSchema = new Schema({
    id_user: String,
    status_pembayaran: Boolean,
    total_pembayaran: Number,
    berat: Number,
    detail_transaksi: [{id_product: String, jumlah_product: Number}]
},{
    timestamps: true
})

let transaksi = mongoose.model("transaksi", transaksiSchema);
module.exports = { transaksi }