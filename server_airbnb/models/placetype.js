"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PlaceType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PlaceType.hasMany(models.Property, {
        foreignKey: "place_type_id",
        as: "properties",
      });
    }
  }
  PlaceType.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      type_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      type_img: {
        type: DataTypes.STRING,
      },
      type_title: {
        type: DataTypes.STRING,
      },
      type_desc: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "PlaceType",
      tableName: "place_types",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return PlaceType;
};
