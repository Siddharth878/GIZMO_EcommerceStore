const express = require('express');
const userController = require('../controllers/userControllers');
const authController = require('../middlewares/auth');

const router = express.Router();


router.route('/register').post(userController.registerUser);
router.route('/login').post(userController.login);
router.route('/logout').get(userController.logout);


router.post('/forgotPassword',userController.forgotPassword);
router.patch('/resetPassword/:token',userController.resetPassword);

router.route('/me').get(authController.protect,userController.getuserDetails);
router.route('/updatePassword').patch(authController.protect,userController.updatePassword);



router.patch('/updateMe',authController.protect,userController.updateMe);




// Admin Routes (login and (OnlyAdmin))
router.get('/admin/getUsers',authController.protect,authController.authorizedRole('admin'),userController.getAllUsers);



// Call this same route with different methods 
router.route('/admin/getSingleUser/:id')
.get(authController.protect,authController.authorizedRole('admin'),userController.getSingleUser)
.put(authController.protect,authController.authorizedRole('admin'),userController.updateUser)
.delete(authController.protect,authController.authorizedRole('admin'),userController.deleteUser)




module.exports = router;
