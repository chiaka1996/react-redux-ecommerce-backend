const views = require('../models/RecentlyViewed');

//add recently viewed products
exports.addRecentlyViewed = async (req, res) => {
    try{
    const {image,design,price,size,quantity,productType,status,availableQuantity, description} = req.body;
    const addView = new views({
        image,
        design,
        price,
        size,
        quantity,
        productType,
        status,
        availableQuantity,
        description
    })

    const response = await addView.save()
    if(response){
        res.status(200).json({
            message: 'view added successfully'
        })
    }
}
catch(err){
    res.status(400).json({
        message: err
    })
}
}