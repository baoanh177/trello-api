"use strict"

/** @type {import('sequelize-cli').Migration} */
const { faker } = require("@faker-js/faker");
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        await queryInterface.bulkInsert("columns", [
            {
                name: "Column 1",
                board_id: 1,
                created_at: faker.date.past(),
                updated_at: faker.date.past(),
            },
            {
                name: "Column 2",
                board_id: 2,
                created_at: faker.date.past(),
                updated_at: faker.date.past(),
            },
            {
                name: "Column 3",
                board_id: 1,
                created_at: faker.date.past(),
                updated_at: faker.date.past(),
            }
        ])
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete("columns", null, {})
    },
}
