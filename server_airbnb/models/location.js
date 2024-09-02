"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Location.belongsTo(models.Country, {
        foreignKey: "country_id",
        as: "country",
      });
    }
  }
  Location.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: sequelize.literal("uuid_generate_v4()"),
      },
      country_id: DataTypes.UUID,
      location_name: DataTypes.STRING,
      apartment: { type: DataTypes.STRING, allowNull: false },
      city: { type: DataTypes.STRING, allowNull: false },
      province: { type: DataTypes.STRING, allowNull: false },
      street: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "Location",
      tableName: "locations",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Location;
};
