const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/productController");

const { authentication, isAdmin } = require('../midlewares/auth')


router.get("/all", ProductController.readProducts);
router.get("/:id", ProductController.readDetailProduct);

// Authentication, hannya yang memiliki token atau sudah login yang bisa melakukan task dibawah ini
// Authorization, hannya admin yang bisa melakukan task dibawah ini
router.post("/create", ProductController.createProduct);
router.delete("/:id", authentication, ProductController.deleteProduct);
router.put("/:id", authentication, ProductController.updateProduct);



module.exports = router;
