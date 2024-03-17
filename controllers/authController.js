const User = require("../models/UserModel")
const bcrypt = require("bcryptjs")

const signUpUser = async (req, res) => {
    try {
      const existingEmail = await User.findOne({ email: req.body.email.toLowerCase() });
      const existingUsername = await User.findOne({ username: req.body.username.toLowerCase() });
    
      if (existingEmail) {
        return res.status(200).json({ response: "Fail", message: 'Email already in use' });
      }
      if (existingUsername) {
        return res.status(200).json({ response: "Fail", message: 'Username already in use' });
      }
      const firstname = req.body.firstname.toLowerCase()
      const lastname = req.body.lastname.toLowerCase()
      const username = req.body.username.toLowerCase()
      const email = req.body.email.toLowerCase()

      const user = new User({
        firstname : firstname,
        lastname : lastname,
        username : username,
        email : email,
        password : req.body.password,
      });
      await user.save();
      
      res.status(200).json({response : "Success", user});
    } catch (error) {
        res.status(200).json({response : "Fail", message : error.message})
    }
  };

  
const signInUser = async(req, res)=>{
    
  const emailOrUsername = req.body.emailOrUsername.toLowerCase()
  const password = req.body.password

  if(emailOrUsername  && password){
    try{ 
      const loginData = await User.findOne({$or : [{email : emailOrUsername}, {username : emailOrUsername}]})
      if(!loginData){
        return res.status(200).json({response:"Fail", message: "User not found. Please try again"})
      }
      const checkedEmail = loginData.email ? loginData.email.toLowerCase() : ""
      const checkedUsername = loginData.username ? loginData.username.toLowerCase() : ""
      const storedPassword = loginData.password
      
      if((checkedEmail === emailOrUsername) || (checkedUsername === emailOrUsername)){
        const checkedPassword = await bcrypt.compare(password, storedPassword)
       
          if(!checkedPassword){
              return res.status(200).json({response : "Fail", message : "Password Incorrect"})
          }
          return res.status(200).json({response : "Success", loginData})
      }else{
          return res.status(200).json({response: "Fail", message : "Email or Username not registered"})
      }
      
      }catch(error){
          res.status(200).json({response: "Fail", message : error.message})
      }
  }else{
       res.status(200).json({response: "Fail", message : "Please enter your E-mail / Username and Password"})
  }
}


module.exports = {signUpUser, signInUser}