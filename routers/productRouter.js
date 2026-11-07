const express = require('express');

const {
  createProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

const { productValidation } =
  require('../middleware/productValidation');

const router = express.Router();

router.post('/createproduct', productValidation, createProduct);
router.get('/allproducts', getAllProducts);
router.get('/getoneproduct/:id', getOneProduct);
router.patch('/updateproduct/:id', updateProduct);
router.delete('/deleteproduct/:id', deleteProduct);

module.exports = router;