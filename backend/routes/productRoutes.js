const { getAllProducts } = require("../controllers/productControllers");

const express = require('express');
const productController = require('../controllers/productControllers');
const auth = require('../middlewares/auth');


const router = express.Router();


router.route('/products').get(productController.getAllProducts);
router.route('/admin/products/new').post(auth.protect,auth.authorizedRole('admin'),productController.createProduct);

router.route('/admin/products/:id')
    .put(auth.protect,auth.authorizedRole('admin'),productController.updateProducts)
    .delete(auth.protect,auth.authorizedRole('admin'), productController.deleteProducts)
    
    
router.get('/products/:id',productController.getProductDetails)
// router.patch('/review',auth.protect,productController.createProductReview);
router.put('/review',auth.protect,productController.createProductReview);



router.route('/reviews')
.get(productController.getProductReviews)
.delete(auth.protect,productController.deleteReview);

module.exports = router;

 