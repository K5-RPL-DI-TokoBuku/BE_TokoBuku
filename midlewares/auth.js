const { user } = require('../models/user')
const { verifyToken } = require('../helpers/jwt')

async function authentication(req, res, next) {
  const token = req.headers.token
  try {
    if (!token) {
      console.log("User doesnt have token!")
      res.status(401).json({
        statuc_code: 401,
        message: "Not Authorized",
      });
    //   throw { name: 'You are unauthenticated to make this request' }
      
    } else {
      const payload = verifyToken(token)
      if (payload){
        console.log("Token Exist and Succes To verify")
        console.log(`Name: ${payload.user} & Email : ${payload.email} Try ro find in database`)
        const userExist = await user.find({email: payload.email})

        if (!userExist) {  
          console.log(`Name: ${payload.user} & Email : ${paylaod.email} Doesnt exist in database`)
          throw { name: "Your token Invalid"}
        } else { 
          console.log(`Name: ${payload.user} & Email : ${payload.email} Exist in database`)
          req.userLogin = userExist[0]
          next()
        }
      } else {
        console.log("Token Exist but Failed To verify")
        throw { name: "Failed to verify token."}
      }
    }
  } catch (err) {
    console.log(err)
    next(err)
  }
}

async function isAdmin(req, res, next) {
//   const id = req.params.id
  console.log('Is admin yas')
  console.log(req.userLogin,'from is admin')
  
  try {
    if(req.userLogin){
        next()
    } else {
        throw { name: 'Is admin error'}
    }
    // const todo = await Todo.findByPk(id)
    // console.log(todo)
    // if (!todo) {
    //   throw { name: 'Todo doesn\'t exist' }
    // } else {
    //   if (todo.UserId !== req.userLogin.id) {
    //     throw { name: 'You are unauthorized to make this request' }
    //   } else {
    //     next()
    //   }
    // }
  } catch (err) {
    next(err)
  }


}

module.exports = {
  authentication,
  isAdmin
}