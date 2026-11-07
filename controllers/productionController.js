const { Product, Category } = require('../models');

const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      quantity,
      categoryId
    } = req.body;

    const category = await Category.findByPk(categoryId);

    if (!category) {
      return res.status(404).json({
        message: 'Category not found'
      });
    }

    const product = await Product.create({
      name,
      description,
      price,
      quantity,
      categoryId
    });

    res.status(201).json({
      message: 'Product created successfully',
      data: product
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{
        model: Category,
        as: 'category'
      }]
    });

    res.status(200).json({
      message: 'Products retrieved successfully',
      data: products
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOneProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{
        model: Category,
        as: 'category'
      }]
    });

    if (!product) {
      return res.status(404).json({
        message: 'Product not found'
      });
    }

    res.status(200).json({
      message: 'Product found successfully',
      data: product
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: 'Product not found'
      });
    }

    await product.update(req.body);

    res.status(200).json({
      message: 'Product updated successfully',
      data: product
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: 'Product not found'
      });
    }

    await product.destroy();

    res.status(200).json({
      message: 'Product deleted successfully'
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
  deleteProduct
};