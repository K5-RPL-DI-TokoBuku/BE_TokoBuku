const {hashPassword, comparePassword} = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');
const mongoose = require('mongoose');
const {user} = require('../models/user')

class UserController {
  static async postRegister(req, res, next) {
    let { email, password, name, nik } = req.body;
    console.log(req.body)
    const new_pass = hashPassword(password)
    console.log(new_pass)
    let newUser = {
      email, password: new_pass, name, nik
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
          email,
          name,
        
        });
      } else {
        console.log('Error Regis user')
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

    let new_product = {
      name, author, category, image_link, price, quantity, description
    }
    
    let new_cart = cart

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
      const add = await user.findOneAndUpdate(email, {cart: new_cart})
      let message = 'Success Add to cart'
      
      if (update){
        message = 'Add Quantity Product in cart'
      }
      
      if(add){
        res.status(201).json({
          message,
          add
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
    // console.log(id_product)
    // console.log(cart[0].id)

    // for(let i=0; i<cart.length; i++){
    //   if(id_product == cart[i].id){
    //     console.log('Sama')
    //   } else {
    //     console.log('Tidak Sama')

    //   }
    // }

    const removecart = cart.filter(e => e.id != id_product)
    // console.log(removecart.length)

    // res.json({msg: 'Hai', id_product, email,  'cart': removecart})

    try{
      if(removecart){
        const delete_product_from_cart = await user.findOneAndUpdate(email, {cart: removecart})
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
    let { label_alamat, nama_penerima,nomor_telepon,kota_kecamatan,kode_pos,alamat } = req.body 
    console.log('Ini req body\n', req.body)
    

    try{
      let new_userData = await user.findOneAndUpdate(email, {alamat_pengiriman: {label_alamat, nama_penerima,nomor_telepon,kota_kecamatan,kode_pos,alamat}}, {returnOriginal: false})
      if(new_userData){
        console.log('Ini hasil dari db\n',new_userData )

        res.status(201).json({
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
}
module.exports = UserController;