const { Category } = require('../models');

const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    const existing = await Category.findOne({ where: { name } });

    if (existing) {
      return res.status(400).json({
        message: 'Category already exists'
      });
    }

    const category = await Category.create({
      name,
      description
    });

    res.status(201).json({
      message: 'Category created successfully',
      data: category
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();

    res.status(200).json({
      message: 'Categories retrieved successfully',
      data: categories
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOneCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: 'Category not found'
      });
    }

    res.status(200).json({
      data: category
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: 'Category not found'
      });
    }

    await category.update(req.body);

    res.status(200).json({
      message: 'Category updated successfully',
      data: category
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: 'Category not found'
      });
    }

    await category.destroy();

    res.status(200).json({
      message: 'Category deleted successfully'
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getOneCategory,
  updateCategory,
  deleteCategory
};