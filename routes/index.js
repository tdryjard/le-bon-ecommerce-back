const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const router = express.Router();
const checkToken = require('../middlewares/webToken/checkToken')
const checkTokenCookie = require('../middlewares/webToken/checkTokenCookie')

const image = require('./image/image.route')
const purchase = require('./purchase/purchase.route')

router.use(cookieParser());

router.use('/image', cors({ credentials: true, origin: process.env.ORIGIN_URL }), image)

router.use('/purchase', cors({ credentials: true, origin: process.env.ORIGIN_URL }), purchase)

router.use('/create-customer', cors({ credentials: true, origin: process.env.ORIGIN_URL }), async (req, res) => {
  // Create a new customer object
  console.log({
    email: req.body.email,
    name: req.body.name,
    address: req.body.address
  })
  const customer = await stripe.customers.create({
    email: req.body.email,
    name: req.body.name,
    address: {
      line1: req.body.address,
      city: req.body.city,
      postal_code: req.body.codePostal,
      country: req.body.country
    }
  });

  // Recommendation: save the customer.id in your database.
  res.send({ customer });
});

router.use('/secret', cors({ credentials: true, origin: process.env.ORIGIN_URL }), async (req, res) => {
  const intent = await stripe.paymentIntents.create({
    amount: 30000,
    currency: 'eur',
    // Verify your integration in this guide by including this parameter
    metadata: {integration_check: 'accept_a_payment'},
  });
  res.json({client_secret: intent.client_secret});
});

module.exports = router;