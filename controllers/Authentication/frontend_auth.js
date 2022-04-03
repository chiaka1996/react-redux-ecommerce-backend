const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
const Signup = require('../../models/Authentication/frontendRegistration');

exports.frontendSignup = async (req, res) => {
  try{
  const errorArray = []; 
  const nameRegex = /^[a-z]+/i;
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/gi;
  const { firstname, lastname, username, phone, email, password} = req.body;

  if (!firstname || !lastname || !username || !phone || !email || !password) {
    errorArray.push('please fill all fields');
    return res.status(400).json({errorArray})
  }
  if (!nameRegex.test(firstname) || !nameRegex.test(lastname)) {
    errorArray.push('name should be only alphabeths');
  }
  if (!emailRegex.test(email)) {
    errorArray.push('please input the correct email');
  }
  if(password.length < 7){
    errorArray.push('password should be 7 or more characters');
  }
  //check if username already exists
  const checkUsername = await Signup.findOne({username});
  if(checkUsername){
    errorArray.push('username already exists');
    return res.status(400).json({errorArray})
  }
  //check if email already exists
  const checkEmail = await Signup.findOne({email})
  if(checkEmail){
    errorArray.push("email already exists")
    return res.status(400).json({errorArray})
  }

  if(errorArray.length > 0){
    return res.status(400).json({errorArray});
  }   
      // hash the password and save to database
      const hashPassword = await bcrypt.hash(password, 10)
      if(hashPassword){
        frontendUser = new Signup({
          firstname,
          lastname,
          username,
          phone,
          email,
          state: '',
          address: '',
          gender: '',
          birthday: '',
          password: hashPassword,
          newsletter: false
      })
    }
      const saveUser = await frontendUser.save()
      if(saveUser){
        res.status(201).json({
          message: "user registered successfuly"
        })
      }
  }
  catch(err){
   return res.status(500).json({
     message: 'something went wrong. check your network connection and retry'
    })
  }
};

//Update signup profile.
exports.UpdateSignup = async (req, res) => {
  try{
    const errorArray = []; 
    const nameRegex = /^[a-z]+/i;
    const userRegex = /^[a-z]+[0-9]*/i;
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i;
   
    const {_id, firstname, lastname, username, phone, email, state, address, password, gender, birthday} = req.body;
    if(!firstname || !lastname || !username || !email || !phone){
      errorArray.push('please fill all required fields')
      return res.status(400).json({
        message: errorArray
      })
    }
    if (!nameRegex.test(firstname) || !nameRegex.test(lastname)) {
      errorArray.push('name should be only alphabeths');
    }
    if(!userRegex.test(username) || username.length > 7 || username.length < 3){
      errorArray.push('username should be greater than 3 and less than 8 characters and alphanumeric')
    }
    if (!emailRegex.test(email)) {
      errorArray.push('please input the correct email');
    }
    if(errorArray.length > 0){
      return res.status(400).json({
        message: errorArray
      });
    }

    const updateSignup = new Signup({
      _id,
      firstname,
      lastname,
      username,
      phone,
      email,
      state,
      address,
      password,
      gender,
      birthday
    });
    const updateData = await Signup.updateOne({_id}, updateSignup)
    if(updateData){
      res.status(201).json({
        message: "updated successfully"
      })
    }
  }
  catch(err){
    res.status(500).json({
      message: "something went wrong. check your internet connection"
    })
  }
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
exports.frontendLogin = async (req, res) => {
  try{
       const { email, password } = req.body;
       const user = await Signup.findOne({email})
          if(!user){
            return res.status(400).json({
              message: "email and password do not match"
            })
          }
      const checkPassword = await bcrypt.compare(password, user.password)
          if(!checkPassword){
            return res.status(400).json({
              message: "email and password do not match"
            })
          }
      const token = jwt.sign(
        {userId: user._id},
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
        gender: user.gender,
        birthday: user.birthday,
        token,
        newsletter: user.newsletter,
        message: 'user logged in'
    });

  }
  catch(err){
    res.status(500).json({
      message: "don't panic. Check your network connection"
    })
  }
};

//change user password.
exports.changePassword = async (req, res) => {
  const {_id, oldPassword, newPassword} = req.body;
  console.log(req.body)

  if(!oldPassword || !newPassword) {
    res.status(400).json("please fill all fields")
  } 
  else{
    if(oldPassword.length < 7 || newPassword.length < 7){
      res.status(400).json('password should be 7 or more characters')
    }
    else {
      const response = await Signup.findOne({_id})
      if(!response){
        return res.status(400).json('user does not exist')
      }

      const valid =  await bcrypt.compare(oldPassword, response.password)
      if(!valid){
        return res.status(400).json('Incorrecet old password')
      }   

      const hashedPassword = await bcrypt.hash(newPassword, 10)
      if(!hashedPassword){
       return res.status(500).json("something went wrong from our end. Try again later")
      }
      const passwordChange = new Signup({
        _id,
        password: hashedPassword
      })

      const updatePassword = await Signup.updateOne({_id}, passwordChange)
      if(!updatePassword){
        res.status(500)
        .json("something went wrong from our end. Try again")
      }
      else{
        res.status(201)
        .json('password changed successfully');
      }
    }
  }
}

// update newsletter
exports.newsletter = async (req, res) => {
  const {_id, newsletter} = req.body;

  if(!_id || typeof(newsletter) !== 'boolean' ){
    return res.status(400).json('invalid request');
  }

  const newsletterChange = new Signup({
    _id,
    newsletter
  })

  const updateNewsletter = await Signup.updateOne({_id}, newsletterChange)
  if(!updateNewsletter){
    res.status(500)
    .json("something went wrong from our end. Try again")
  }
  else{
    res.status(201)
    .json({
      newsletter,
      message: 'newsletter updated successfully'
    }
    )
  }
}



