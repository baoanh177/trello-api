"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
    class Task extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Task.belongsTo(models.Column, {
                foreignKey: "column_id"
            })
        }
    }
    Task.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            column_id: DataTypes.INTEGER,
            content: DataTypes.STRING,
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
            modelName: "Task",
            tableName: "tasks",
            createdAt: "created_at",
            updatedAt: "updated_at",
        }
    )
    return Task
}
