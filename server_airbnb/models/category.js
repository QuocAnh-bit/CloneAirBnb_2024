"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.hasMany(models.Property, {
        foreignKey: "category_id",
        as: "properties",
      });
    }
  }
  Category.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      category_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      category_img: {
        type: DataTypes.STRING,
      },
      category_title: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Category",
      tableName: "categories",
      createdAt: "created_at",
      updatedAt: "updated_at",
      underscored: false,
    }
  );
  return Category;
};
