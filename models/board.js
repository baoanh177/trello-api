"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
    class Board extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Board.belongsTo(models.User, {
                foreignKey: "user_id"
            })
            Board.hasMany(models.Column, {
                foreignKey: "board_id",
                as: "columns"
            })
        }
    }
    Board.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: DataTypes.STRING,
            user_id: DataTypes.INTEGER,
            created_at: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            updated_at: {
                allowNull: false,
                type: DataTypes.DATE,
            },
        },
        {
            sequelize,
            modelName: "Board",
            tableName: "boards",
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    )
    return Board
}
