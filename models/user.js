"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            User.hasMany(models.Board, {
                foreignKey: "user_id"
            })
        }
    }
    User.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            email: DataTypes.STRING,
            name: DataTypes.STRING,
            api_key: DataTypes.STRING,
            image: DataTypes.STRING,
            status: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: "User",
            tableName: "users",
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    )
    return User
}
