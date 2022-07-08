const router = require('express').Router();
const Authuser = require('../middleware/Authuser');
const productsControl = require('../controllers/handleProducts');
const ShoeproductsControl = require('../controllers/ShoeProducts');
const Product = require('../controllers/Addproducts');
// const multer = require('../middleware/multer-config');
const authentication = require('../controllers/Authentication/frontend_auth');
const allOrders = require('../controllers/Orders');
const recenltyViewed = require('../controllers/RecentlyViewed')
const multer = require("../middleware/multer-config")

router.post('/addShoeproduct', ShoeproductsControl.addShoeForSale);

router.get('/getshoeproduct', ShoeproductsControl.getShoeProduct);

router.post('/editshoeproduct', ShoeproductsControl.EditShoeProduct);

router.post('/deleteshoeproduct', ShoeproductsControl.deleteShoeProduct);

router.post('/addproducts', multer.single('image'), Product.addProducts)

router.get('/getproduct', Product.getProducts)

router.post('/edit', Product.EditProduct)

router.post('/delete', Product.DeleteProduct)

router.post('/add_product', productsControl.addProduct);

router.get('/get_products', productsControl.getProduct);

router.post('/getUserOrders', allOrders.getOrder);

router.post('/updatestatus', allOrders.UpdateProductStatus);

router.get('/getallorders', allOrders.getAllOrders);

router.post('/loginUser', authentication.frontendLogin);

router.post('/changepassword', authentication.changePassword);

router.post('/allorders', allOrders.Allorders);

router.post('/registeruser', authentication.frontendSignup);

router.post('/getsignupdetails', authentication.getSignupDetails);

router.get('/allusers', authentication.allUsers)

router.put('/editproduct', productsControl.EditProduct);

router.put('/updatesignup', authentication.UpdateSignup);

router.post('/deleteProduct', productsControl.deleteProduct);

router.post('/newsletter', authentication.newsletter);

router.post('/recentlyviewed', recenltyViewed.addRecentlyViewed)

module.exports = router;