const path = require("path");
var fs = require("fs");
const {
  Provider,
  User,
  Blacklist,
  Property,
  Category,
  PlaceType,
  Country,
  Location,
  Amenity,
  AmenityType,
  PropertyImage,
  Discount,
  DiscountType,
  Booking,
} = require("../models/index");
const { log } = require("console");

module.exports = {
  getProperties: async () => {
    try {
      const properties = await Property.findAll({
        where: { add_public: true },
        order: [["created_at", "desc"]],
        include: [
          {
            model: User,
            as: "user",
            attributes: {
              exclude: ["password", "refresh_token", "provider_id"],
            },
          },
          {
            model: Location,
            as: "location",
            include: [
              {
                model: Country,
                as: "country",
              },
            ],
          },

          {
            model: PropertyImage,
            as: "propertyImages",
          },
        ],
      });
      return properties;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  createProperty: async (userId) => {
    try {
      const property = await Property.create({
        user_id: userId,
      });
      return property;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  getProperty: async (propertyId) => {
    try {
      const property = await Property.findOne({
        where: { id: propertyId },
        include: [
          {
            model: User,
            as: "user",
            attributes: {
              exclude: ["password", "refresh_token", "provider_id"],
            },
          },
          {
            model: Category,
            as: "category",
          },
          {
            model: PlaceType,
            as: "place_type",
          },
          {
            model: Location,
            as: "location",
            include: [
              {
                model: Country,
                as: "country",
              },
            ],
          },
          {
            model: Amenity,
            as: "amenities",
          },
          {
            model: PropertyImage,
            as: "propertyImages",
          },
          {
            model: Booking,
            as: "bookings",
          },
          {
            model: Discount,
            as: "discounts",
            include: [
              {
                model: DiscountType,
                as: "discount_type",
              },
            ],
          },
        ],
      });
      await property.update({ add_structure: true });
      if (property.add_receipt) {
        await property.update({ add_finish: true });
      }
      console.log(property, "check123");
      return property;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  updateProperty: async (filedSubmit, propertyId) => {
    let findIdField = null; // tìm id của trường gửi lên nằm trong bảng nào
    let findUpdateProperty = null; // tìm update vào trường nào của property

    try {
      if (filedSubmit.category_name) {
        console.log(filedSubmit.category_name, "2221");
        findIdField = await Category.findOne({
          where: { category_name: filedSubmit.category_name },
        });
        findUpdateProperty = {
          category_id: findIdField.id,
          add_privacy: true,
        };
      }
      // Table PlaceType
      if (filedSubmit.place_type) {
        findIdField = await PlaceType.findOne({
          where: { type_name: filedSubmit.place_type },
        });
        findUpdateProperty = {
          place_type_id: findIdField.id,
          add_location: true,
        };
      }

      // Table Property
      if (filedSubmit.quantity) {
        const { guests, bedrooms, beds, bathrooms } = filedSubmit.quantity;
        findUpdateProperty = {
          num_bedrooms: bedrooms,
          num_guests: guests,
          num_beds: beds,
          num_bathrooms: bathrooms,
          add_amenities: true,
        };
      }
      if (filedSubmit.property_name) {
        if (filedSubmit.property_name.length > 32) throw Error();
        console.log("Thêm");
        findUpdateProperty = {
          property_name: filedSubmit.property_name,
          add_desc: true,
        };
      }
      if (filedSubmit.desc) {
        if (filedSubmit.desc.length > 500) throw Error();
        findUpdateProperty = {
          desc: filedSubmit.desc,
          add_price: true,
        };
      }
      if (filedSubmit.price) {
        if (filedSubmit.price > 10000 || filedSubmit.price < 10) throw Error();
        findUpdateProperty = {
          night_price: filedSubmit.price,
          add_discount: true,
        };
      }
      if (filedSubmit.public) {
        findUpdateProperty = {
          add_public: filedSubmit.public,
        };
      }
      const update = await Property.update(findUpdateProperty, {
        where: { id: propertyId },
      });

      const property = await Property.findByPk(propertyId);
      return property;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  createLocation: async (body, propertyId) => {
    try {
      const { apartment, city, province, street } = body;
      const [country, createdCountry] = await Country.findOrCreate({
        where: { country_name: body.country },
        defaults: {
          country_name: body.country,
        },
      });
      console.log(country.id);
      const [location, createdLocation] = await Location.findOrCreate({
        where: { country_id: country.id },
        defaults: {
          apartment,
          city,
          province,
          street,
        },
      });
      // console.log(createdLocation);
      // cap nhat vao bang location
      if (!createdLocation) {
        await Location.update(
          { apartment, city, province, street },
          { where: { country_id: country.id } }
        );
      }
      // them vao property
      const update = await Property.update(
        { location_id: location.id },
        {
          where: { id: propertyId },
        }
      );
      const property = await Property.findByPk(propertyId);
      return property;
    } catch (error) {
      return false;
    }
  },
  uploadImgs: async (propertyId, images, order) => {
    try {
      const property = await Property.findOne({ where: { id: propertyId } });
      await property.update({ add_title: true });
      const url = process.env.URL_GET_IMAGES + "properties/";
      const imagesInstance = await Promise.all(
        images.map(async (image) => {
          const result = await PropertyImage.create({
            order: order ? order : null,
            property_id: property.id,
            img_name: url + image.filename,
          });

          return result;
        })
      );
      await property.addPropertyImages(imagesInstance);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  updateSortImages: async (propertyId, sortedImages) => {
    try {
      if (sortedImages) {
        const images = await PropertyImage.findAll({
          where: { property_id: propertyId },
          order: [["order", "desc"]],
        });

        sortedImages.forEach(async (element, index) => {
          await PropertyImage.update(
            { order: element.order },
            { where: { id: element.id } }
          );
        });

        return images;
      } else {
        throw Error();
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  deleteImage: async (propertyId, idImage) => {
    try {
      const image = await PropertyImage.findOne({ where: { id: idImage } });
      const pathDelete = path.basename(image.img_name);
      fs.unlink(`public/images/properties/${pathDelete}`, function (err) {
        if (err) return console.log(err);
        console.log("file deleted successfully");
      });
      await image.destroy();
      return true;
    } catch (error) {
      return false;
    }
  },
};
