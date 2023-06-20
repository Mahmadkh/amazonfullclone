const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51NKPkEFNVnqt4vperticRjhoqdS7rRs9W3uuFlWEigY00l9aOa7RB8OLYElvZHg6vGuzdk4PXggIbsPJuDrAfxd200qleEdPGu"
);

// API

// App config

const app = express();

// Middlewarts

app.use(cors({ origin: "*" }));
app.use(express.json());

// api routes
app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("Payment Request Recieved", total);
  if (total < 500) {
    response.status(403).send({
      msg: "Value is less than 500$",
      clientSecret: paymentIntent.client_secret,
    });
  }
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });

  console.log(paymentIntent);

  //  ok-created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// listen command
exports.api = functions.https.onRequest(app);
