const { Booking } = require("../models/index");
const {
  eachDayOfInterval,
  isPast,
  isBefore,
  startOfDay,
  isSameDay,
  isWithinInterval,
  parseISO,
} = require("date-fns");

module.exports = {
  createBooking: async (event) => {
    if (event) {
      switch (event.type) {
        case "payment_intent.succeeded":
          console.log("Thanhf pp");
          try {
            const { amount, id } = event.data.object;
            const {
              check_in,
              check_out,
              customer_id,
              customer_email,
              product_id,
            } = event.data.object.metadata;
            const booking = await Booking.create({
              check_in,
              check_out,
              user_id: customer_id,
              property_id: product_id,
              service_fee: 0.4,
              total_price: amount,
              payment_intent_id: id,
              status: "Da thanh toan",
            });
          } catch (error) {
            console.log(error);
            return false;
          }

          break;
        case "payment_method.attached":
          const paymentMethod = event.data.object;
          // Then define and call a method to handle the successful attachment of a PaymentMethod.
          // handlePaymentMethodAttached(paymentMethod);
          break;
        default:
          // Unexpected event type
          console.log(`Unhandled event type ${event.type}.`);
      }
    }
    return true;
  },
  checkDuplicateOrderDate: async (property_id, check_in, check_out) => {
    // Check xem date có phải là ngày trong quá khứ k
    const now = new Date();

    if (
      isBefore(startOfDay(check_in), startOfDay(now)) ||
      isBefore(startOfDay(check_out), startOfDay(now)) ||
      isSameDay(check_in, check_out)
    ) {
      console.log("LÔI");
      return false;
    }

    const booking = await Booking.findAll({ where: { property_id } });
    const datesOrder = booking.map(({ dataValues }) => ({
      check_in: dataValues.check_in,
      check_out: dataValues.check_out,
    }));
    // Kiểm tra xem có ngày gửi lên có trùng với những ngày đã đặt hay không
    for (let date of datesOrder) {
      if (
        isWithinInterval(check_in, {
          start: date.check_in,
          end: date.check_out,
        }) ||
        isWithinInterval(check_out, date.check_in, date.check_out)
      ) {
        return false;
      }
    }
    return true;
  },
};
