let added_product = require('../models/Add_product_model');

//add productss for sale to the datatbase
exports.addProduct = (req, res) => {

    console.log(req.body);
    const products_added = new added_product({
        image : req.body.image,
        design: req.body.design,
        price : req.body.price,
        size : req.body.size,
        quantity : req.body.quantity,
        productType : req.productType,
        availableQuantity : req.body.availableQuantity,
        status : req.body.status,
        description : req.body.description

    });

     products_added.save()
    .then(() => res.status(201).json('product added!'))
    .catch(error => res.status(400).json('Error : ' + error));
}

// get product for sale from the database.
exports.getProduct = (req, res) => {
  added_product.find().then(
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


//edit products for sale.
exports.EditProduct = (req, res) => {
  const updateProduct = new added_product({
    _id : req.body._id,
    image : req.body.image,
    design : req.body.design,
    price : req.body.price,
    size : req.body.size,
    quantity : req.body.quantiy,
    productType : req.body.productType,
    availableQuantity : req.body.availableQuantity,
    status : req.body.status,
    description : req.body.description
  });

  added_product.updateOne({_id: req.body._id}, updateProduct)
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

//Delete product for sale
exports.deleteProduct = (req, res) => {
  console.log(req.body._id)
  added_product.deleteOne({_id : req.body._id}).then(
    () => {
      res.status(200).json({
        message : 'Product deleted!, please refresh the page'
      });
    }
  ).catch(
    (error) => {
      res.status(201).json({
        error : 'please checck your network connection!'
      });
    }
  );
}