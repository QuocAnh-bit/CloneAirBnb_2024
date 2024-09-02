const axios = require("axios");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const paymentsService = require("../service/paymentsService");
module.exports = {
  index: async (req, res) => {
    const { infoPayment } = req.body;
    const response = {};

    const {
      id: product_id,
      totalPrice: total_price,
      customerEmail: customer_email,
      customerName: customer_name,
      customerId: customer_id,
      checkIn: check_in,
      checkOut: check_out,
      guestTypes: guest_types,
    } = infoPayment[0];
    // Create a PaymentIntent with the order amount and currency
    console.log(check_in, guest_types, "Ngày");
    const checkDates = await paymentsService.checkDuplicateOrderDate(
      product_id,
      check_in,
      check_out
    );
    if (checkDates) {
      const paymentIntent = await stripe.paymentIntents.create({
        metadata: {
          customer_id,
          customer_name,
          customer_email,
          product_id,
          check_in,
          check_out,
          quantity_adults: guest_types.adults,
          quantity_children: guest_types.children,
          quantity_infants: guest_types.infants,
        },
        description: `Payment for reservation ${product_id}`,
        amount: total_price * 100,
        currency: "usd",
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
        automatic_payment_methods: {
          enabled: true,
        },
      });

      Object.assign(response, {
        status: 200,
        // message: "Bad request",
        clientSecret: paymentIntent.client_secret,
      });
    } else {
      console.log();

      Object.assign(response, {
        status: 204,
      });
    }
    res.status(response.status).json(response);
  },
};
