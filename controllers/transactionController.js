const midtransClient = require('midtrans-client'); 
// Create Core API instance
let core = new midtransClient.CoreApi({
  isProduction: false,
  serverKey: `${process.env.YOUR_SERVER_KEY}`,
  clientKey: `${process.env.YOUR_CLIENT_KEY}`
});

const {transaksi} = require('../models/transaksi');

const axios = require('axios');
const FormData = require('form-data');

class Transaction {
  static async sendChargeRequestToMidtrans(req, res, next) {
    console.log("Server Key:", `${process.env.YOUR_SERVER_KEY}`);
    let {payment_type, email, gross_amount, order_id} = req.body

    if(!payment_type && !email && !gross_amount && !order_id){
      throw({name: 'Input failed'})
    }
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

  static async getCityInProvince(req,res,next){
    const {province} = req.body

    console.log(province)

    try{
      axios
        .get(`https://api.rajaongkir.com/starter/city?province=${province}`,{
          headers: {key: process.env.KEY_RAJA_ONGKIR}
        })
        .then(({data}) => {
            console.log('Result from raja ongkir')

            let arr = data['rajaongkir']['results']

            res.status(200).json({
              // result,
              msg: `Fetc City in ${arr[0]['province']}`,
              result: arr
            })
        })
        .catch(err=>{
            console.log(err)
        })
        .finally(()=>{
            console.log('Fetch city in province , to raja ongkir API')
        })
    }catch(err){
      next(err)
    }
  }

  static async getTypeCourier(req,res,next){

  }

  static async checkOngkir(req,res,next){
    const {destination, weight, courier} = req.body
    console.log('Req body :\n', req.body)

    // courier Valid : pos, tiki, jne

    // Origin Kabupaten Bandung City Id : 22
    // Destination Kabupaten Aceh Barat Daya City Id : 2


    // const form = new FormData({
    //   'destination': destination,
    //   'origin': 21,
    //   'weight': weight,
    //   'courier': courier,
    // });
    // form.append('destination', destination)
    // from.append('origin', origin)
    // from.append('weight', weight)
    // from.append('courier', courier)




    try{
      axios
        .post('https://api.rajaongkir.com/starter/cost', {
          'destination': destination,
          'origin': 22,
          'weight': weight,
          'courier': courier,
        }, {
          headers: {key: process.env.KEY_RAJA_ONGKIR},
        })
        .then(({data}) => {
            console.log('Success get Raja Ongkir cost', data['rajaongkir']['results'])

            res.status(200).json({
              msg: 'OKE',

              rajaongkir: data['rajaongkir'],
              results : data['rajaongkir']['results']

            })
        })
        .catch(err=>{
            console.log(err)
            // res.status(400).json({
            //   msg: 'Oke Failed'
            // })
        })
        .finally(()=>{
            console.log('Fetch to raja ongkir API For Check Cost')
        })

    }catch(err){
      console.log(err)
      next(err)
    }
  }
}

module.exports = Transaction;