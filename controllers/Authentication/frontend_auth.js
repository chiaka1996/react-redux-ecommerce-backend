const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const Signup = require('../../models/Authentication/frontendRegistration');

exports.frontendSignup = (req, res) => {

  const errorArray = [];
 
  const nameRegex = /^[a-z]+/gi;

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/gi;

  const { firstname, lastname, username, phone, email, state, address, password } = req.body;

  if (!firstname || !lastname || !username || !phone || !email || !state || !address || !password) {
    errorArray.push('please fill all fields');
  }

  if (firstname.length < 2 || lastname.length < 2 ) {
    errorArray.push('names should be greater than one character');
  }

  if (!nameRegex.test(firstname)) {

    errorArray.push('name should be only alphabeths');
  }

  // check if email already exists
  Signup.findOne({ email }).then(
    (emailCheck) => {
      if (emailCheck) {

        errorArray.push('email already exists');

      }

      if (!emailRegex.test(email)) {
        errorArray.push('please input the correct email');
      }

      if(password.length < 7){
        errorArray.push('password should be 7 or more characters');
      }

      if (errorArray.length > 0) {
        return res.status(201).json({ errorArray });
      
      }
      // hash the password and save to database
      bcrypt.hash(password, 10).then(
        (hash) => {

          const frontendUser = new Signup({
            firstname,
            lastname,
            username,
            phone,
            email,
            state, 
            address,
            password: hash
          });
          
          frontendUser.save()
            .then(() => res.json('user registered'))
            .catch((err) => res.status(400).json(`Error: ${err}`));

        }
      ).catch((err) => res.status(400).json(`Error: ${err}`));


    }

  ).catch((err) => res.status(400).json(`Error: ${err}`));


};

//Update signup profile.
exports.UpdateSignup = (req, res) => {
  const updateSignup = new Signup({
    _id : req.body._id,
    firstname : req.body.firstname,
    lastname :  req.body.lastname,
    username :  req.body.username,
    phone :  req.body.phone,
    email :  req.body.email,
    state :  req.body.state,
    address :  req.body.address,
    password :  req.body.password
  });

  Signup.updateOne({_id: req.body._id}, updateSignup)
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


//get signup details
exports.getSignupDetails = (req, res) => {
  Signup.findOne({_id: req.body._id}).then(
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


//login Route
exports.frontendLogin = (req, res) => {

  const { email, password } = req.body;

  Signup.findOne({ email }).then(
    (user) => {

      if (!user) {
        return res.status(201).json({ message: 'email and password do not match' });
      } 

      bcrypt.compare(password, user.password).then(
        (valid) => {

          if (!valid) {

            return res.status(201).json({ message: 'email and password do not match' });
          }

          const token = jwt.sign(
            { userId: user._id },
            'RANDOM_TOKEN-SECRET_NUMBER',
            { expiresIn: '24h' }
          );

          res.status(200).json({
            _id : user._id,
            firstname: user.firstname,
            lastname : user.lastname,
            username : user.username,
            phone : user.phone,
            email : user.email,
            state : user.state,
            address : user.address,
            password : user.password,
            token,
            message: 'user logged in'
          });
        }
      ).catch((err) => res.status(400).json(`Error: ${err}`));
    }
  ).catch((err) => res.status(400).json(`Error: ${err}`));


};



