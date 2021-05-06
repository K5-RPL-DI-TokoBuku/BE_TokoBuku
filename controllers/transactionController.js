const midtransClient = require('midtrans-client'); 
// Create Core API instance
let core = new midtransClient.CoreApi({
  isProduction: false,
  serverKey: `${process.env.YOUR_SERVER_KEY}`,
  clientKey: `${process.env.YOUR_CLIENT_KEY}`
});

const {transaksi} = require('../models/transaksi');


class Transaction {
  static async sendChargeRequestToMidtrans(req, res, next) {
    console.log("Server Key:", `${process.env.YOUR_SERVER_KEY}`);
    let {payment_type, email, gross_amount, order_id} = req.body
    let parameter = {
      payment_type,
      transaction_details: {
        gross_amount,
        order_id,
      },
      customer_details: {
        email,
        first_name: "ichlasul",
        last_name: "amal",
        phone: "+6282 3620 97321",
      },
      item_details: [
        {
          id: "1388998298204",
          price: 5000,
          quantity: 1,
          name: "Ayam Zozozo",
        },
        {
          id: "1388998298205",
          price: 5000,
          quantity: 1,
          name: "Ayam Xoxoxo",
        },
      ],
      bank_transfer: {
        bank: "bca",
        va_number: "111111",
        bca: {
          sub_company_code: "00000",
        },
        free_text: {
          inquiry: [
            {
              id: "Free Text ID Free Text ID Free Text ID",
              en: "Free Text EN Free Text EN Free Text EN",
            },
          ],
          payment: [
            {
              id: "Free Text ID Free Text ID Free Text ID",
              en: "Free Text EN Free Text EN Free Text EN",
            },
          ],
        },
      },
    };
    try {
      core
        .charge(parameter)
        .then((chargeResponse) => {
          console.log("chargeResponse:");
          console.log(chargeResponse);
          res.status(201).json({
            message: "Success Charge, periksa log klo lo ga percaya! ",
            chargeResponse
          })
        })
        .catch((e) => {
          throw { name: e.name}
        });
    } catch (err) {
      next(err)
    }
  };

  static async createTransaksi(req,res,next){
    // id_user: mongoose.isValidObjectId,
    // status_pembayaran: boolean,
    // total_pembayaran: Number,
    // berat: Number,
    // date: { type: Date, default: Date.now },
    // detail_transaksi: [{id_product: mongoose.isValidObjectId, jumlah_product: Number}]

  //   {
  //     id_user: '60759a6daa2e7c3a6c3675cb',
  //     status_pembayaran: 'false',
  //     detail_transaksi: [
  //         {
  //             id_product: '6076b0c1301b193234e19870', jumlah_product: 2
  //         },
  //         {
  //             id_product: '6076cf3aa196bf31a0149729', jumlah_product: 2
  //         },
  //     ] ,
  //     total_pemabayaran: 218000,
  //     berat: 2,
  // }

    let {id_user, status_pembayaran, total_pembayaran, berat, detail_transaksi} = req.body

    let post_data = {
      id_user, 
      status_pembayaran, 
      total_pembayaran, 
      berat, 
      detail_transaksi
    }

    try {
      const new_transaksi = await transaksi.create(post_data)
      res.status(201).json({
        message: 'Success Create transaksi'
      })

    } catch(err) {
      next(err)
    }
  }

  static async readTransactions(req,res,next){
    try {
      const all = await transaksi.find({})
      res.status(200).json({
        msg: 'Find All transaksi',
        response: all
      })
    } catch(err){
      console.log(err)
    }
  }

  static async readTransactionsById(req,res,next){
    // console.log(req.params)
    // res.status(200).json({
    //   msg: 'Oke'
    // })
    try{
      const detail = await transaksi.findById(req.params.id)
      res.status(200).json({
        msg: 'Get Detail Transaksi',
        response: detail
      })

    } catch(err){
      console.log(err)
    }
  }


  static async deleteTransaction(req, res,next){
    try{
      const transactionExist = await transaksi.findByIdAndRemove(req.params.id)
      res.status(200).json({
        msg: 'Berhasil delete transaction',
        response: transactionExist
      }) 


    } catch(err){
      console.log(err)
    }
  }
}

module.exports = Transaction;