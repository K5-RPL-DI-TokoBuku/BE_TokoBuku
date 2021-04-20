const {hashPassword, comparePassword} = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');
const mongoose = require('mongoose');

const {user} = require('../models/user')

class UserController {
  static async postRegister(req, res, next) {
    let { email, password, name, nik } = req.body;
    const new_pass = hashPassword(password)
    let newUser = {
      email, password: new_pass, name, nik
    }
    try {
      const regis_user = await user.create(newUser)
      if (regis_user){
        res.status(201).json({
          status_code: 201,
          message: "Register User Success",
          email,
          name
        });
      } else {
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
        // console.log("iklas")
        throw { name: "User doesnt exist or wrong password" };
      }
    } catch (err) {
      next(err);
    }
  }
}
module.exports = UserController;