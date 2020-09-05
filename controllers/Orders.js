let Orders = require('../models/Orders');

//add orders to the database
exports.Allorders = (req, res) => {
    const all_Orders = new Orders({
        
        username : req.body.username,
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        phone : req.body.phone,
        address : req.body.address,
        total : req.body.total,
        status: req.body.status,
        order : req.body.order

        
    });

     all_Orders.save()
    .then(() => res.status(201).json('Order Succefull'))
    .catch(error => res.status(400).json('Error : ' + error));
}

//get specific user order from database
exports.getOrder = (req, res) => {
  console.log(req.body);
  console.log(req.body.username);
    Orders.find({username : req.body.username}).then(
        (details) => {
          res.status(200).json(details);
        }
      ).catch(
        (error) => {
          res.status(200).json({
            error: error
          });
        }
      );
    }

    //get all orders from database
exports.getAllOrders = (req, res) => {
  Orders.find().then(
    (ord) => {
      res.status(200).json(ord);
    }
  ).catch(
    (error) => {
      res.status(200).json({
        error: error
      });
    }
  );
}

//update the status of an order
exports.UpdateProductStatus = (req, res) => {
  const updateProductStatus = new Orders({
    _id : req.body._id,
    username : req.body.username,
    firstname : req.body.firstname,
    lastname : req.body.lastname,
    phone : req.body.phone,
    address : req.body.address,
    total : req.body.total,
    status: req.body.status,
    order : req.body.order
  });

  Orders.updateOne({_id: req.body._id}, updateProductStatus)
  .then(() => {
    res.status(201).json({
      message : "updated successfully"
    })
  }).catch(
    () => {
      res.status(200).json("something went wrong, please check your network connection");
    }
  );
}

