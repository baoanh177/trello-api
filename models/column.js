"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
    class Column extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Column.hasMany(models.Task, {
                foreignKey: "column_id"
            })
            Column.belongsTo(models.Board, {
                foreignKey: "board_id"
            })
        }
    }
    Column.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: DataTypes.STRING,
            board_id: DataTypes.STRING,
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
            modelName: "Column",
            tableName: "columns",
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    )
    return Column
}
