const midtransClient = require('midtrans-client'); 
// Create Core API instance
let core = new midtransClient.CoreApi({
  isProduction: false,
  serverKey: `${process.env.YOUR_SERVER_KEY}`,
  clientKey: `${process.env.YOUR_CLIENT_KEY}`
});

const {transaksi} = require('../models/transaksi');
const {user} = require('../models/user')

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
        first_name,
        last_name,
        phone,
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

    // Bikin database transaksi
    // Update detail pembayaran

    console.log(req.body)

    let {id_user, total_pembayaran, berat, detail_transaksi} = req.body

    let post_data = {
      id_user, 
      total_pembayaran, 
      berat, 
      detail_transaksi,
      kurir: {
        name_courier,
        service,
        description,
        costValue,
        costEtd,
      }
    }

    try {
      const new_transaksi = await transaksi.create(post_data)

      if(new_transaksi){
        console.log('Transaksi Created >>>')
        res.status(201).json({
          message: 'Success Create transaksi',
          new_transaksi
        })
      } else {

      }
      

    } catch(err) {
      next(err)
    }
  }

  static async readTransactions(req,res,next){
    console.log('Hello Iklas')

    const id_user = req.userLogin['_id']
    console.log("ID: ", id_user)
    try {
      const all = await transaksi.find({id_user})
      res.status(200).json({
        msg: 'Find All transaksi',
        total: all.length,
        response: all
      })
    } catch(err){
      console.log(err)
      next(err)
    }
  }

  static async newReadTransactions(req,res,next){
    console.log('Hello ')
    const id_user = req.userLogin['_id']
    console.log('Id User : ', id_user)
  
    try {
      const all = await transaksi.find({})
      console.log("all", all)
      

      if (all){
        res.status(200).json({
          msg : ' Find All Transaksi By Admin : OK',
          response: all
        })
      } else {
        console.log('All not found')
      }
    } catch(err){
      console.log('Kena Catch')
      next(err)
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

  static async buatTransaksi(req, res,next){
    const {userData, products, courier, ongkir, pembayaran, total_pembayaran } = req.body

    // Define Variabel
    let dataTransaksi = {
      id_user: userData['_id'],
      total_pembayaran,
      berat: 2,
      detail_transaksi:products,
      detail_status_pembayaran:{},
      kurir: courier
    }

    try {

      // Step 1 Create Transaksi In DB
      const newTransaksi = await transaksi.create(dataTransaksi)

      if (newTransaksi){
        console.log("New transaksi: \n", newTransaksi)
      } else {
        console.log("Transaksi Error")
      }

      // Step 2 Create Pembayaran To Midtrans
      let dataPayment = {
        payment_type: pembayaran['paymentType']['type'].toLowerCase().split(" ").join("_"),
        transaction_details: {
          order_id: newTransaksi['_id'],
          gross_amount: total_pembayaran
        },
        bank_transfer: {
          "bank": pembayaran['paymentChannel']['title']
        }
      }

      console.log("Data Payment :\n", dataPayment)

      const newPayment = await core.charge(dataPayment)

      if(newPayment){
        console.log("New Payment :\n", newPayment)
      } else {
        console.log("New Payment Error")
      }

      // Step 3 Update DB with midtrans Result
      const {transaction_id, order_id, merchant_id, gross_amount, currency, payment_type, transaction_time, transaction_status, va_numbers, fraud_status} = newPayment
      const detail_status_pembayaran = {
        transaction_id, order_id, merchant_id, gross_amount, currency, payment_type, transaction_time, transaction_status, va_numbers, fraud_status
      }
      const id_transaksi = newTransaksi._id

      console.log("ID transaksi : ", id_transaksi)
      console.log("Detail status pembayaran : \n", detail_status_pembayaran)

      const updateTransaksi = await transaksi.findOneAndUpdate(
        {_id: id_transaksi},
        {detail_status_pembayaran},
        {returnOriginal: false}
      )

      if (updateTransaksi){
        console.log("Updated transaksi : \n", updateTransaksi)
      } else {
        console.log('Update transaksi gagal')
      }

      // Step 4 Update Cart User 

      if (newTransaksi && newPayment && updateTransaksi){
        const updateUserCart = await user.findOneAndUpdate(
          {email : userData['email']},
          {cart: []},
          {returnOriginal: false}
        )
  
        if (updateUserCart){
          console.log("Update user cart:\n", updateUserCart)
        } else {
          console.log("Update user cart failed")
        }
      }

      // Step 5 Send Result To User
      if (newTransaksi && newPayment && updateTransaksi){

        const va_numbers = detail_status_pembayaran['va_numbers'][0]
        res.status(200).json({
          msg: 'oke Iklas',
          bank : va_numbers['bank'],
          va: va_numbers['va_number'],
        })
      } else {
        console.log("Error : Failed to create transaction user!")
        throw({name: 'Failed to create transaction user!'})
      }

    }catch(err){
      console.log(err)
      next(err)
    }
  }

  
}

module.exports = Transaction;