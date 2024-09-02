"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Property extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Property.hasMany(models.PropertyImage, {
        foreignKey: "property_id",
        as: "propertyImages",
      });
      Property.hasMany(models.Booking, {
        foreignKey: "property_id",
        as: "bookings",
      });
      Property.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
      Property.belongsTo(models.Category, {
        foreignKey: "category_id",
        as: "category",
      });
      Property.belongsTo(models.PlaceType, {
        foreignKey: "place_type_id",
        as: "place_type",
      });
      Property.belongsTo(models.Location, {
        foreignKey: "location_id",
        as: "location",
      });
      Property.belongsToMany(models.Amenity, {
        foreignKey: "property_id",
        through: "amenities_properties",
        as: "amenities",
      });
      Property.hasMany(models.Discount, {
        foreignKey: "property_id",
        as: "discounts",
      });
    }
  }
  Property.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: sequelize.literal("uuid_generate_v4()"),
      },
      user_id: DataTypes.UUID,
      location_id: DataTypes.UUID,
      property_name: DataTypes.STRING,
      desc: DataTypes.STRING,
      num_guests: DataTypes.INTEGER,
      num_beds: DataTypes.INTEGER,
      num_bedrooms: DataTypes.INTEGER,
      num_bathrooms: DataTypes.INTEGER,
      night_price: DataTypes.FLOAT,
      add_privacy: DataTypes.BOOLEAN,
      add_discount: DataTypes.BOOLEAN,
      add_structure: DataTypes.BOOLEAN,
      add_location: DataTypes.BOOLEAN,
      add_floor_plan: DataTypes.BOOLEAN,
      add_amenities: DataTypes.BOOLEAN,
      add_photos: DataTypes.BOOLEAN,
      add_title: DataTypes.BOOLEAN,
      add_desc: DataTypes.BOOLEAN,
      add_price: DataTypes.BOOLEAN,
      add_receipt: DataTypes.BOOLEAN,
      add_finish: DataTypes.BOOLEAN,
      add_public: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Property",
      tableName: "properties",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Property;
};
