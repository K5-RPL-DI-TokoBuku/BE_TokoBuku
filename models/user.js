const { productSchema} = require('./product')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    cart: [productSchema]
},{
    timestamps: true
})

let user = mongoose.model("user", userSchema);
module.exports = { user }