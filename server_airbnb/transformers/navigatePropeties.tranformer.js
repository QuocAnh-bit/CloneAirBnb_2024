const Transformer = require("../core/Transformer");
const property = require("../models/property");

class NavigateTransformer extends Transformer {
  response(instance) {
    return {
      id: instance.id,
      addPrivacy: instance.add_privacy,
      addDiscount: instance.add_discount,
      addStructure: instance.add_structure,
      addLocation: instance.add_location,
      addFloorPlan: instance.add_floor_plan,
      addAmenities: instance.add_amenities,
      addPhotos: instance.add_photos,
      addTitle: instance.add_title,
      addDesc: instance.add_desc,
      addPrice: instance.add_price,
      addReceipt: instance.add_receipt,
      addFinish: instance.add_finish,
      category: instance.category ? true : false,
      placeType: instance.place_type ? true : false,
      location: instance.location ? true : false,
      floorPlan:
        instance.num_bathrooms &&
        instance.num_bedrooms &&
        instance.num_beds &&
        instance.num_guests
          ? true
          : false,
      amenities: instance.amenities ? true : false,
      photos: instance.propertyImages ? true : false,
      title: instance.property_name ? true : false,
      desc: instance.desc ? true : false,
      price: instance.night_price ? true : false,
    };
  }
}
module.exports = NavigateTransformer;
