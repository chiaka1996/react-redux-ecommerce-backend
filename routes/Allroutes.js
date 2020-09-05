const router = require('express').Router();

const Authuser = require('../middleware/Authuser');

const productsControl = require('../controllers/handleProducts');

const ShoeproductsControl = require('../controllers/ShoeProducts');

// const multer = require('../middleware/multer-config');

const authentication = require('../controllers/Authentication/frontend_auth');

const allOrders = require('../controllers/Orders');

router.post('/addShoeproduct', ShoeproductsControl.addShoeForSale);

router.get('/getshoeproduct', ShoeproductsControl.getShoeProduct);

router.post('/editshoeproduct', ShoeproductsControl.EditShoeProduct);

router.post('/deleteshoeproduct', ShoeproductsControl.deleteShoeProduct);

router.post('/add_product', productsControl.addProduct );

router.get('/get_products', productsControl.getProduct);

router.post('/getUserOrders', allOrders.getOrder);

router.post('/loginUser', authentication.frontendLogin);

router.post('/allorders', allOrders.Allorders);

router.post('/registerUser', authentication.frontendSignup);

router.post('/getsignupdetails', authentication.getSignupDetails);

router.put('/editproduct', productsControl.EditProduct);

router.put('/updatesignup', authentication.UpdateSignup);

router.post('/deleteProduct', productsControl.deleteProduct);


module.exports = router;