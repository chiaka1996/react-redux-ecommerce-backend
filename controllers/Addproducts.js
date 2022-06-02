const cloudinary = require("../middleware/cloudinary")
const products = require('../models/AddProducts')

exports.addProducts = async (req, res) => {
    try{
        const {productType, subProduct, productName, description, size, availableQuantity, price} = req.body;
        if(!productType || !subProduct || !productName || !description || !size || !availableQuantity || !price){
            res.status(400).json({
                message: 'please fill all fields'
            })
            return
        }

        const result =  await cloudinary.uploader.upload(req.file.path)
        if(result){          
            let product = new products({
                image: result.secure_url,
                cloudinaryId: result.public_id,
                productType,
                subProduct,
                productName,
                description,
                price,
                size,
                availableQuantity,
                quantity: 0,
                status: false

            })

            const saveProduct = await product.save()
            if(saveProduct){
                res.status(200).json({
                    message: 'product saved successfully',
                })
            }
        }       
    }
    catch(error){
        res.status(500).json({
            message: 'please check your internet connection'
        })
    }
}