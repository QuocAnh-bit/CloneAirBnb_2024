"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Amenity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Amenity.belongsTo(models.AmenityType, {
        foreignKey: "amenity_type_id",
        as: "amenity_type",
      });
      Amenity.belongsToMany(models.Property, {
        foreignKey: "amenity_id",
        through: "amenities_properties",
        as: "properties",
      });
    }
  }
  Amenity.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: sequelize.literal("uuid_generate_v4()"),
      },
      amenity_type_id: DataTypes.UUID,
      img_name: DataTypes.STRING,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Amenity",
      tableName: "amenities",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Amenity;
};
