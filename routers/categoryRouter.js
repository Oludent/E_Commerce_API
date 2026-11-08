const express = require('express');

const {createCategory, getAllCategories, getOneCategory, updateCategory,  deleteCategory} = require('../controllers/categoryController');

const router = express.Router();

router.post('/createcategory', createCategory);
router.get('/allcategories', getAllCategories);
router.get('/getonecategory/:id', getOneCategory);
router.patch('/updatecategory/:id', updateCategory);
router.delete('/deletecategory/:id', deleteCategory);

module.exports = router;