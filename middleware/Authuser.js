const jwt = require('jsonwebtoken');

const AuthUser = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN-SECRET_NUMBER');
        const userId = decodedToken.userId;
        if(req.body.userId && req.body.userId !== userId) {
            throw 'Invalid user ID'
        } 
        else{
            next();
        }
    }
    catch{
        res.status(401).json({
            error : new Error('Invalid request')
        });
    }
};

module.exports = AuthUser;