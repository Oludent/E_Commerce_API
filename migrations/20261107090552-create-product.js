'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      name: {
        type: Sequelize.STRING,
        allownull: false
      },
      description: {
        type: Sequelize.TEXT,
        allownull: true
      },
      price: {
        type: Sequelize.DECIMAL(10,2),
        allownull: false
      },
      quantity: {
        type: Sequelize.INTEGER,
        allownull: false,
        defaultValue: 0
      },
      categoryId: {
        type: Sequelize.UUID,
        allownull: false,
        references: {
          models: "Categories",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT"
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
    await queryInterface.dropTable('Products');
  }
};