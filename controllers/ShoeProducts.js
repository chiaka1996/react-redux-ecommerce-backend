let shoe_product = require('../models/AddShoesForSale');

//add shoe products for sale to the datatbase
exports.addShoeForSale = (req, res) => {

    console.log(req.body);
    const shoe_added = new shoe_product({
        image : req.body.image,
        design: req.body.design,
        price : req.body.price,
        size : req.body.size,
        productType : req.body.productType,
        quantity : req.body.quantity,
        availableQuantity : req.body.availableQuantity,
        status : req.body.status,
        description : req.body.description

    });

     shoe_added.save()
    .then(() => res.status(201).json('product added!'))
    .catch(error => res.status(400).json('Error : ' + error));
}


// get product shoe for sale from the database.
exports.getShoeProduct = (req, res) => {
    shoe_product.find().then(
      (products) => {
        res.status(200).json(products);
      }
    ).catch(
      (error) => {
        res.status(200).json({
          error: error
        });
      }
    );
  }
  
  
  //edit shoe products for sale.
  exports.EditShoeProduct = (req, res) => {
    const updateProduct = new shoe_product({
      _id : req.body._id,
      image : req.body.image,
      design : req.body.design,
      price : req.body.price,
      size : req.body.size,
      quantity : req.body.quantiy,
      productType : req.body.quantity,
      availableQuantity : req.body.quantity,
      status : req.body.quantity,
      description : req.body.description
    });
  
    shoe_product.updateOne({_id: req.body._id}, updateProduct)
    .then(() => {
      res.status(201).json({
        message : "updated successfully"
      })
    }).catch(
      (err) => {
        res.status(200).json("something went wrong, please check your network connection");
      }
    );
  }
  
  //Delete shoe product for sale
  exports.deleteShoeProduct = (req, res) => {
    console.log(req.body);
    shoe_product.deleteOne({_id : req.body._id}).then(
      () => {
        res.status(200).json({
          message : 'Deleted!'
        });
      }
    ).catch(
      (error) => {
        res.status(201).json({
          error : 'please check your network connection!'
        });
      }
    );
  }