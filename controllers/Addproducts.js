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

// get product
exports.getProducts = async (req, res) => {
    try{
        let {type, page, limit} = req.query
        let result = {}
        page = parseInt(page)
        limit = parseInt(limit)
        const startIndex = (page - 1) * limit
        const endIndex = page * limit
        if(!type || !page || !limit){
            res.status(400).json({
                message: 'please input all parameters'
            })
            return
        }

        result.current = page

        if(endIndex < await products.countDocuments().exec()){
            result.next = {
                page: page + 1,
                limit
            }
        }

        if(startIndex > 0){
            result.previous ={
                page: page - 1,
                limit: limit
            }
        }

        const noOfProducts = await products.collection.find({productType: type}).count()
        if(noOfProducts){
            result.totalProduct = noOfProducts
        }


        const results = await products.find({productType: type}).limit(limit).skip(startIndex).exec()
        if(results){
            result.results = results
            res.status(200).json(result)
        }

    }
    catch(err){
       res.status(500).json({
           message: err.message
       })
    }
}

//edit and update product
exports.EditProduct = async (req, res) => {
    try{
        const {_id, productType, subProduct, productName, description, size, availableQuantity, price} = req.body;
        if(!productType || !subProduct || !productName || !description || !size || !availableQuantity || !price){
            res.status(400).json({
                message: 'please fill all fields'
            })
            return
        }

        const updateProduct = new products({
        _id,
        productType,
        price,
        size,
        availableQuantity,
        productName,
        description,
        subProduct
  });

  const response = await products.updateOne({_id}, updateProduct)
  if(response){
    res.status(200).json({
        message: 'product updated successfully',
    })
  }
}
catch(error){
    res.status(500).json({
        message: error.message
    })
}
}

  //Delete shoe product for sale
  exports.DeleteProduct = async (req, res) => {
      try{
        const deleteProduct = await products.deleteOne({_id:req.body._id})
        if(deleteProduct){
            res.status(200).json({
                message : 'Product deleted successfully'
              });
        }

      }
      catch(error){
        res.status(500).json({
            message: error.message
        })
      }
  }
