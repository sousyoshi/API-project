"use strict";

const { DataTypes } = require("sequelize");
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Users";
    return Promise.all([
      queryInterface.addColumn(options, "firstName", { type: DataTypes.STRING }),
      queryInterface.addColumn(options, "lastName", { type: DataTypes.STRING }),
    ]);

    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Users";
    return Promise.all([queryInterface.removeColumn(options, "firstName"), queryInterface.removeColumn(options, "lastName")]);

    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};