"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Country extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Country.hasMany(models.Location, {
        foreignKey: "country_id",
        as: "location",
      });
    }
  }
  Country.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: sequelize.literal("uuid_generate_v4()"),
      },
      country_name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Country",
      tableName: "countries",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Country;
};
