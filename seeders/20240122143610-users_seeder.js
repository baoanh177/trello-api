"use strict";

/** @type {import('sequelize-cli').Migration} */
const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");
module.exports = {
  async up(queryInterface, Sequelize) {
    const salt = bcrypt.genSaltSync(10);
    const users = [
      {
        name: "Bao Anh Test",
        email: "baoanh27042004@gmail.com",
        image: faker.image.avatar(),
        api_key: "apikey",
        status: true,
        created_at: faker.date.past(),
        updated_at: faker.date.past(),
      }
    ];
    for (let i = 0; i < 5; i++) {
      users.push({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        image: faker.image.avatar(),
        api_key: null,
        status: faker.datatype.boolean(),
        created_at: faker.date.past(),
        updated_at: faker.date.past(),
      });
    }
    await queryInterface.bulkInsert("users", users);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users");
  },
};
