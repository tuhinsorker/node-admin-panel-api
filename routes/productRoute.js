const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");
const auth = require("../middleware/auth");
const checkRole = require('../middleware/role');
const upload = require('../middleware/upload');

router.post(
  "/admin/create-product",
  auth,
  checkRole('admin'),
  upload.single('image'),
  productController.createProduct
);


router.get(
  "/admin/products",
  auth,
  checkRole('admin'),
  productController.getProducts,
);


router.put(
  "/admin/update-product/:id",
  auth,
  checkRole('admin'),
    upload.single('image'),
  productController.updateProduct,
);

router.get(
  "/admin/single-product/:id",
  auth,
  checkRole('admin'),
  productController.getProductById,
);

router.delete(
  "/admin/delete-product/:id",
  auth,
  checkRole('admin'),
  productController.deleteProduct,
);


module.exports = router;
