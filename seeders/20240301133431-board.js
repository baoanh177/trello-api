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
        await queryInterface.bulkInsert("boards", [
            {
                name: "Board 1",
                user_id: 1,
                created_at: faker.date.past(),
                updated_at: faker.date.past(),
            },
            {
                name: "Board 2",
                user_id: 2,
                created_at: faker.date.past(),
                updated_at: faker.date.past(),
            },
            {
                name: "Board 3",
                user_id: 1,
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
        await queryInterface.bulkDelete("boards", null, {})
    },
}
