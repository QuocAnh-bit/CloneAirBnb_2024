"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PropertyImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PropertyImage.belongsTo(models.Property, {
        foreignKey: "property_id",
        as: "Property",
      });
    }
  }
  PropertyImage.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: sequelize.literal("uuid_generate_v4()"),
      },
      property_id: DataTypes.UUID,
      img_name: DataTypes.STRING,
      order: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "PropertyImage",
      tableName: "property_images",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return PropertyImage;
};
