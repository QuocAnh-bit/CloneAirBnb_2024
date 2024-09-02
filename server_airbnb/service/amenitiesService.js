const { Amenity, AmenityType, Property } = require("../models/index");

module.exports = {
  getAmenities: async () => {
    try {
      const amenities = await Amenity.findAll({
        order: [["amenity_type_id", "desc"]],
        include: [
          {
            model: AmenityType,
            as: "amenity_type",
          },
        ],
      });
      const groupAmenityTypes = amenities.reduce((acc, item) => {
        const { type_name, desc, order } = item.amenity_type;

        const amenities = acc.find((group) => group.amenityType === type_name);

        // Nếu nhóm đã tồn tại, thêm item vào mảng data của nhóm
        if (amenities) {
          amenities.data.push(item);
        } else {
          // Nếu nhóm chưa tồn tại, tạo một nhóm mới và thêm vào mảng acc
          acc.push({
            amenityType: type_name,
            desc: desc,
            order,
            data: [item],
          });
        }

        return acc;
      }, []);

      const data = groupAmenityTypes.map((group) => {
        const newDataItems = group.data.map((itemArray) => {
          const amenity = itemArray.dataValues;
          if (amenity) {
            const { amenity_type, ...newItem } = amenity;
            return newItem;
          }
        });
        return { ...group, data: newDataItems };
      });
      return data;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  addAmenities: async (idProperty, amenities) => {
    try {
      const property = await Property.findOne({ where: { id: idProperty } });
      await property.update({ add_photos: true });
      if (!property) {
        throw Error("Id Khoong ton tai");
      }
      if (property && amenities) {
        const amenitiesInstance = await Promise.all(
          amenities.map(async (amenity) => {
            const result = await Amenity.findOne({
              where: { name: amenity },
            });
            return result;
          })
        );
        await property.setAmenities(amenitiesInstance);
        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  },
};
