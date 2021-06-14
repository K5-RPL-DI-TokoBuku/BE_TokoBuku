const { productSchema} = require('./product')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// let alamatPengirimanSchema = new Schema({
//     label_alamat:  String,
//     nama_penerima: String,
//     nomor_telepon:   Number,
//     kota_kecamatan: String,
//     kode_pos: Number,
//     alamat: String,
//   });

let userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true,
    },
    nik: {
        type: String,
        required: true,
    },
    cart: [productSchema],
    alamat_pengiriman: {
        label_alamat:  String,
        nama_penerima: String,
        nomor_telepon:   Number,
        provinsi: String,
        kabupaten: String,
        kota_kecamatan: String,
        kode_pos: Number,
        alamat: String}
},{
    timestamps: true
})

let user = mongoose.model("user", userSchema);
module.exports = { user }