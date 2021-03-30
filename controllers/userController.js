class UserController {
  static async postRegister(req, res, next) {
    let { email, password, fullname, country } = req.body;
    try {
      if (email && password && fullname && country) {
        res.status(201).json({
          status_code: 201,
          message: "Register User Success",
          email,
          fullname,
          country
        });
      } else {
        throw { name: "Register User Failed" };
      }
    } catch (err) {
      next(err);
    }
  }
  static async postLogin(req, res, next) {
    let { email, password } = req.body;
    try {
      if (email && password) {
        res.status(200).json({
          status_code:200,
          message: "Login Success",
          email
        });
      } else {
        throw { name: "Login User Failed" };
      }
    } catch (err) {
      next(err);
    }
  }
}
module.exports = UserController;