const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/productController");

router.get("/all", ProductController.readProducts);
router.get("/:id", ProductController.readDetailProduct);
router.post("/create", ProductController.createProduct);

module.exports = router;
