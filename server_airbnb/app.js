require("dotenv").config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const session = require("express-session");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const apiRouter = require("./routes/api");
const imagesRouter = require("./routes/images");

const passport = require("passport");
const googlePassport = require("./passports/google.passport");
const facebookPassport = require("./passports/facebook.passport");

const cors = require("cors");
const paymentService = require("./service/paymentsService");

const processedEvents = new Set();

var app = express();
app.use(cors());
app.use(
  session({
    secret: "f8",
    resave: false,
    saveUninitialized: true,
  })
);
passport.use("google", googlePassport);
passport.use("facebook", facebookPassport);

app.use(logger("dev"));
app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (request, response) => {
    const endpointSecret = process.env.STRIPE_END_POINT_SECRET;
    let event = request.body;
    // Only verify the event if you have an endpoint secret defined.
    // Otherwise use the basic event deserialized with JSON.parse
    if (endpointSecret) {
      // Get the signature sent by Stripe
      const signature = request.headers["stripe-signature"];
      try {
        event = stripe.webhooks.constructEvent(
          request.body,
          signature,
          endpointSecret
        );
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`, err.message);
        return response.sendStatus(400);
      }
    }

    try {
      await paymentService.createBooking(event);
      console.log("Booking created successfully.");
    } catch (error) {
      console.log("Error creating booking:", error);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1/", apiRouter);
// Webhook stripe

app.use("/images/", imagesRouter);

app.use("/", indexRouter);

module.exports = app;
