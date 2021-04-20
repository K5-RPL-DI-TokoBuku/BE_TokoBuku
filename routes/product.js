const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/productController");

const { authentication, isAdmin } = require('../midlewares/auth')


router.get("/all", authentication, ProductController.readProducts);
router.get("/:id", ProductController.readDetailProduct);

// Authentication, hannya yang memiliki token atau sudah login yang bisa melakukan task dibawah ini
// Authorization, hannya admin yang bisa melakukan task dibawah ini
router.post("/create", isAdmin, ProductController.createProduct);
router.delete("/:id", authentication, isAdmin, ProductController.deleteProduct);
router.put("/:id", authentication, isAdmin, ProductController.updateProduct);



module.exports = router;
