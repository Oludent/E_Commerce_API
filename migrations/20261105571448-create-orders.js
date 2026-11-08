'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
        },
        customerId: {
          type: Sequelize.UUID,
          allowNull: false
        },
        status: {
            type: Sequelize.ENUM(
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
        allowNull: false
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