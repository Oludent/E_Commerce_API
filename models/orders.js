'use strict';
const {
  Model
} = require('DataTypes');
module.exports = (DataTypes, DataTypes) => {
  class Orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Orders.init({
    id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
        },
        customerId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: 'Customers',  // References the Customers table and its primary key
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
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
        allowNull: false,
        references: {
          model: 'Products', // Links directly to your Products table
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
              type: DataTypes.DATE,
              allowNull: false
            },
        updatedAt: {
              type: DataTypes.DATE,
              allowNull: false
            }
  }, {
    Sequelize,
    modelName: 'Orders',
    tableName: 'ORDERS',
    timestamps: true
  });
  return Orders;
};