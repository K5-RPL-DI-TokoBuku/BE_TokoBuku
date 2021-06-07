const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const { authentication, isAdmin } = require('../midlewares/auth')


router.post("/register", UserController.postRegister);
router.post("/login", UserController.postLogin);
router.get("/users", UserController.readUsers);

router.put('/add_to_cart', authentication,  UserController.addToCart);
router.put('/delete_from_cart', authentication, UserController.deleteFromCart);
router.get('/cart', authentication, UserController.getCart);
router.get('/userdata', authentication, UserController.readUserData);
router.put('/user_address', authentication, UserController.updateAddresUser);
router.post('/check_ongkir', UserController.checkOngkir);

module.exports = router;
