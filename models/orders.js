'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.Customer, {
        foreignKey: 'customerId',
        as: 'customers',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      Order.belongsToMany(models.Product,{
        through: 'OrderItem',
        foreignKey: 'productId',
        as: 'products',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    }
  }
  Order.init({
      id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        customerId: {
          type: DataTypes.UUID,
          allowNull: false
        },
        status: {
            type: DataTypes.ENUM(
                'Pending',
                'Processing',
                'Shipped',
                'Delivered',
                'Cancelled'
              ),
            defaultValue: 'Pending'
        },
      productId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      purchasePrice: {
        type: DataTypes.INTEGER,
        allowNull: false
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
    modelName: 'Order',
    tableName: 'Orders',
    timestamps: true
  });
  return Order;
};