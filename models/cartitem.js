'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CartItem.belongsTo(models.Cart, {
        foreignKey: 'cartId',
        as: 'Cart'
      });
       CartItem.belongsTo(models.Product, {
        foreignKey: 'productId',
        as: 'Product'
      })
    }
  }
  CartItem.init({
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID
      },
      cartId: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
      },
      productId: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
  }, {
    sequelize,
    modelName: 'CartItem',
    tableName: 'CartItems',
    timestamps: true
  });
  return CartItem;
};