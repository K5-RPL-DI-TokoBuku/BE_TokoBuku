const midtransClient = require('midtrans-client'); 
// Create Core API instance
let core = new midtransClient.CoreApi({
  isProduction: false,
  serverKey: `${process.env.YOUR_SERVER_KEY}`,
  clientKey: `${process.env.YOUR_CLIENT_KEY}`
});

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
}

module.exports = Transaction;