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
        await queryInterface.bulkInsert("tasks", [
            {
                content: "Task 1",
                column_id: 1,
                created_at: faker.date.past(),
                updated_at: faker.date.past(),
            },
            {
                content: "Task 2",
                column_id: 2,
                created_at: faker.date.past(),
                updated_at: faker.date.past(),
            },
            {
                content: "Task 3",
                column_id: 1,
                created_at: faker.date.past(),
                updated_at: faker.date.past(),
            },
        ])
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete("tasks", null, {})
    },
}
