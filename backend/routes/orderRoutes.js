const express = require('express');
const router = express.Router();


const ordersControllers = require('../controllers/orderControllers')
const auth = require('../middlewares/auth');


router.route('/order/new').post(auth.protect, ordersControllers.newOrder);
router.get('/order/myOrders', auth.protect, ordersControllers.myOrders);
router.route('/order/:id').get(auth.protect, ordersControllers.getSingleOrder);



router.route('/admin/orders').get(auth.protect, auth.authorizedRole("admin"), ordersControllers.getAllOrders);

router
    .route("/admin/order/:id")
    .put(auth.protect, auth.authorizedRole("admin"), ordersControllers.updateOrder)
    .delete(auth.protect, auth.authorizedRole("admin"), ordersControllers.deleteOrder);


module.exports = router;
