"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AmenityType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AmenityType.hasMany(models.Amenity, {
        foreignKey: "amenity_type_id",
        as: "amenities",
      });
    }
  }
  AmenityType.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: sequelize.literal("uuid_generate_v4()"),
      },
      order: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
      },
      type_name: DataTypes.STRING,
      desc: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "AmenityType",
      tableName: "amenity_types",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return AmenityType;
};
