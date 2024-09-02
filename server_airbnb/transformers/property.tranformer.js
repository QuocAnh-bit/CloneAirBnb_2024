const Transformer = require("../core/Transformer");
const propertyTfs = require("./transformerServices/property.tfs");

class PropertyTransformer extends Transformer {
  response(instance) {
    return {
      id: instance.id,
      propertyName: instance.property_name,
      placeTypeId: instance.place_type_id,
      placeTypeName: instance.place_type?.type_name,
      userId: instance.user_id,
      desc: instance.desc,
      nightPrice: instance.night_price,
      numBathrooms: instance.num_bathrooms,
      numBedrooms: instance.num_bedrooms,
      numBeds: instance.num_beds,
      numGuests: instance.num_guests,
      category: instance?.category?.category_name || null,
      amenities: instance?.amenities?.map((item) => ({
        id: item.id,
        amenityTypeId: item.amenity_type_id,
        imgName: item.img_name,
        name: item.name,
        createdAt: item.created_at,
        updatedAt: item.updated_at,
      })),
      discounts: instance?.discounts?.map((item) => ({
        id: item.id,
        propertyId: item.property_id,
        value: item.value,
        status: item.status,
        discountTypeId: item.discount_type_id,
        ...(item.discount_type
          ? {
              discountType: {
                id: item.discount_type.id,
                desc: item.discount_type.desc,
                edit: item.discount_type.edit,
                order: item.discount_type.order,
                title: item.discount_type.title,
                typeName: item.discount_type.type_name,
              },
            }
          : {}),
        createdAt: item.created_at,
        updatedAt: item.updated_at,
      })),
      status: instance.add_public
        ? "In pending"
        : instance.add_finish
        ? "Verification required"
        : "In progress",
      ...(instance.location
        ? {
            location: {
              apartment: instance.location?.apartment || "",
              city: instance.location?.city || "",
              country: instance.location?.country?.country_name || "", // Sử dụng ? để truy cập thuộc tính country_name
              countryId: instance.location?.country_id || "",
              province: instance.location?.province || "",
              street: instance.location?.street || "",
              locationName: instance.location?.location_name || "",
              createdAt: instance.location?.created_at || "",
              updatedAt: instance.location?.updated_at || "",
            },
          }
        : {}),
      ...(instance.propertyImages
        ? {
            propertyImages: instance.propertyImages
              .sort((a, b) => a.order - b.order)
              .map((item) => ({
                id: item.id,
                imgName: item.img_name,
                order: item.order,
              })),
          }
        : {}),
      ...(instance.user ? { user: instance.user } : {}),
      ...(instance.bookings
        ? { bookings: propertyTfs.datesBooked(instance.bookings) }
        : {}),

      createdAt: instance.created_at,
      updatedAt: instance.updated_at,
    };
  }
}
module.exports = PropertyTransformer;
