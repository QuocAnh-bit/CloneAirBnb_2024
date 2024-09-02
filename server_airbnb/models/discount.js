"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Discount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Discount.belongsTo(models.Property, {
        foreignKey: "property_id",
        as: "property",
      });
      Discount.belongsTo(models.DiscountType, {
        foreignKey: "discount_type_id",
        as: "discount_type",
      });
    }
  }
  Discount.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: sequelize.literal("uuid_generate_v4()"),
      },
      property_id: {
        type: DataTypes.UUID,
      },
      discount_type_id: {
        type: DataTypes.UUID,
      },
      value: DataTypes.INTEGER,
      status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Discount",
      tableName: "discounts",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Discount;
};
