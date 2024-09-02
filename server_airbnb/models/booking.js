"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
      Booking.belongsTo(models.Property, {
        foreignKey: "property_id",
        as: "property",
      });
    }
  }
  Booking.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: sequelize.literal("uuid_generate_v4()"),
      },
      user_id: DataTypes.UUID,
      property_id: DataTypes.UUID,
      check_in: DataTypes.DATE,
      check_out: DataTypes.DATE,
      status: {
        type: DataTypes.STRING,
      },
      service_fee: {
        type: DataTypes.FLOAT,
      },
      total_price: {
        type: DataTypes.FLOAT,
      },
      payment_intent_id: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Booking",
      tableName: "bookings",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Booking;
};
