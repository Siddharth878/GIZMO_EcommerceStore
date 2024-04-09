

const express = require('express');
const router = express.Router();
const paymentControllers = require('../controllers/paymentControllers');
const auth = require('../middlewares/auth');




router.route("/payment/process").post(auth.protect,paymentControllers.processPayment);
router.route("/stripeApiKey").get(auth.protect,paymentControllers.sendStripeApiKey);


module.exports = router;
