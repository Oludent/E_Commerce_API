'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
          id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
        },
        customerId: {
          type: Sequelize.UUID,
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
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Products', // Links directly to your Products table
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      purchasePrice: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  }
};