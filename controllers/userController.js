const {hashPassword, comparePassword} = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');
const {user} = require('../models/user')
const axios = require('axios');



class UserController {
  static async postRegister(req, res, next) {
    let { email, password, name, nik } = req.body;
    console.log(req.body)
    const new_pass = hashPassword(password)
    console.log(new_pass)
    let newUser = {
      email, password: new_pass, name, nik, alamat_pengiriman: {
        'label_alamat': 'Rumah',
        'kota_kecamatan': 'Bandung',
        'kode_pos': 23764,
        'nomor_telepon': 123456723,
        'alamat': 'Not Set'


      }
    }
    console.log("New")
    console.log(newUser)

    try {
      const regis_user = await user.create(newUser)
      if (regis_user){
        console.log(regis_user)
        res.status(201).json({
          status_code: 201,
          message: "Register User Success",
          regis_user
        
        });
      } else {
        console.log('Error Regis user\n', regis_user)
        throw { name: "Register User Failed" };
      }
    } catch (err) {
      next(err);
    }
  }

  static async readUsers(req,res,next){
    try{
      const users = await user.find({})
      if (users){
        res.status(200).json({
          message: 'Oke, Ini daftar all user',
          data: users
        })
      } else {
        throw { name: "Users Not Found" };
      }
    } catch (err) {
      next(err);
    }
  }

  static async readUserData(req, res,next) {
    res.status(200).json({
      message: 'OKE',
      dataUser: req.userLogin
    })
  }

  static async postLogin(req, res, next) {

    // console.log(req.body)
    // res.status(200).json({
    //   msg: 'ok'
    // })
    let { email, password } = req.body;
    try {

      const userExist = await user.findOne({email})
      // console.log(userExist.password)
      // console.log('45')



      if (userExist && comparePassword(password, userExist.password)){

        const payload = {
          user: userExist.name,
          email: userExist.email,
          userID: userExist._id
        }
        const token = signToken(payload)

        res.status(200).json({
          message: 'Berhasil Login',
          user: payload.user,
          ID: userExist._id,
          token
        })

      } else {
        throw { name: "User doesnt exist or wrong password" };
      }




    } catch (err) {
      next(err);
    }
  }

  static async getCart(req,res,next){
    const {email, cart, name} = req.userLogin
    res.status(200).json({msg : 'OK',name, email, cart: cart})
  }

  static async addToCart(req,res,next){
    const {email, cart} = req.userLogin
    let { name, author, category, image_link, price, quantity, description } = req.body 
    console.log(`Email : ${email}, cart : ${cart}`)

    console.log(`request from body : ${req.body['name']}`)

    let new_product = {
      name, author, category, image_link, price, quantity, description
    }
    
    let new_cart = cart
    console.log("New cart : ", new_cart)

    let update = false

    for (let i=0; i< cart.length;i++){
      if ( cart[i]['name'] == name){
        new_cart[i]['quantity'] += 1
        update = true
      }
    }

    if (!update){
      new_cart.push(new_product)
    } else {
      console.log('Just add quantity')
    }

    

    try{
      // res.json({msg: 'Hello', cart: new_cart})
      const add = await user.findOneAndUpdate({email}, {cart: new_cart}, {returnOriginal: false})
      let message = 'Success Add to cart'
      
      
      if (update){
        message = 'Add Quantity Product in cart'
      }
      
      if(add){
        console.log('Hasil Add :\n', add)
        res.status(201).json({
          message,
          result : add
        })
      } else {
        console.log("Error add " , add)
        res.status(400).json({
          message: 'Failed add to cart',
          add
        })
      }
      
    }catch(err){
      console.log(err)
      next(err);
    }
  }

  static async deleteFromCart(req,res,next){
    const {id_product} = req.body
    const {email, cart} = req.userLogin

    const removecart = cart.filter(e => e.id != id_product)

    try{
      if(removecart){
        const delete_product_from_cart = await user.findOneAndUpdate({email}, {cart: removecart}, {returnOriginal: false})
        if (delete_product_from_cart){

          res.status(201).json({
            message: 'Berhasil Delete product from cart',
            new: removecart.length,
          })
        } else {
          res.status(201).json({
            message: 'Gagal Delete product from cart',
            delete_product_from_cart
          })
        }

      } else {
        console.log('Tidak ada yg di remove')
      }
    }catch(err){
      next(err);
    }
  }

  static async updateAddresUser(req,res,next){
    const {email} = req.userLogin
    const { label_alamat, nama_penerima,nomor_telepon,kota_kecamatan,kode_pos,alamat } = req.body 
    console.log('Reques from Body :\n', req.body)
    console.log(`Email From User Login : ${email}`)

    const alamat_pengiriman = {
      label_alamat, 
      nama_penerima,
      nomor_telepon,
      kota_kecamatan,
      kode_pos,
      alamat
    }
    
    try{     
      let new_userData = await user.findOneAndUpdate(
          {email},
          {alamat_pengiriman}, 
          {returnOriginal: false}
        )

      if(new_userData){

        res.status(201).json({
          email,
          label_alamat: req.body['label_alamat'],
          new_userData
        })
      } else {
        console.log("Error new_address ", new_userData)
        res.status(400).json({
          message: 'Failed updated new address',
          new_userData
        })
      }
    } catch(err){
      console.log(err)
      next(err);
    }
  }

  static async checkOngkir(req,res,next){
    const {origin, destination, weight, courier} = req.body
    try {
      // Fet Api 3rd Raja Ongkir
      const url = 'https://api.rajaongkir.com/starter/cost'
      fetch(url,{
        method: 'POST',
        headers: {
          key: process.env.KEY_RAJA_ONGKIR
        },
        body: JSON.stringify({origin, destination, weight, courier})
      }).then(response => {
        console.log(response)
        res.status(200).json({
          message: 'OK',
          response
        })
      }).catch((err)=>{
        next(err)
      })

    } catch(err){
      console.log(err)
    }

    res.status(200).json()
  }

  static async getCityInProvince(req,res,next){
    const {province} = req.body
    // res.status(200).json({
    //   // result,
    //   province,
    //   msg: `https://api.rajaongkir.com/starter/city?province=${province}`
    // })
    try{
      axios
        .get(`https://api.rajaongkir.com/starter/city?province=${province}`,{
            qs: {province},
            headers: {
                key: 'd250cda4c7582091070daf9556d4b40d'
            },
        })
        .then((result) => {
            console.log('Result from raja ongkir')

            res.status(200).json({
              // result,
              url: `https://api.rajaongkir.com/starter/city?province=${province}`,
              result
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
}





module.exports = UserController;