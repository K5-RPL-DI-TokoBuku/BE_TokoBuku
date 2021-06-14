const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let transaksiSchema = new Schema({
    id_user: String,
    total_pembayaran: Number,
    berat: Number,
    detail_transaksi: [Object],
    detail_status_pembayaran: Object,
    kurir: Object
},{
    timestamps: true
})

let transaksi = mongoose.model("transaksi", transaksiSchema);
module.exports = { transaksi }