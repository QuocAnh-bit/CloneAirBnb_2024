"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DiscountType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      DiscountType.hasMany(models.Discount, {
        foreignKey: "discount_type_id",
        as: "discounts",
      });
    }
  }
  DiscountType.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: sequelize.literal("uuid_generate_v4()"),
      },
      type_name: DataTypes.STRING,
      title: DataTypes.STRING,
      desc: DataTypes.STRING,
      order: DataTypes.INTEGER,
      edit: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "DiscountType",
      tableName: "discount_types",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return DiscountType;
};
