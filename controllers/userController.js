const User = require("../models/UserModel")

const getUserProfile = async (req, res) => {
    try {
      const userId = req.params.id
      const user = await User.findById(userId);

      const userData = {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        email: user.email,
        age: user.age,
        gender: user.gender,
        height: user.height,
        weight: user.weight,
        medicalHistory: user.medicalHistory,
        fitnessLevel: user.fitnessLevel,
        fitnessGoals: user.fitnessGoals
      }
      res.status(200).json({response: "Success", userData});
    } catch (error) {
      res.status(404).json({ response: 'Fail', message: "User not found" });
    }
  };



  const saveAdditionalUserInfoById = async (req, res) => {
    try {
      const userId = req.params.id;
  
      const { age, gender, height, weight, medicalHistory, fitnessLevel, fitnessGoals } = req.body;

      const user = await User.findByIdAndUpdate(
        userId,
        {
          age,
          gender,
          height,
          weight,
          medicalHistory,
          fitnessLevel,
          fitnessGoals
        },
        { new: true } 
      );
  
      res.status(200).json({ response: 'Success', user });
    } catch (error) {
      console.error(error);
      res.status(404).json({ response: 'Fail', message: "User not found" });
    }
  };

  const testApi = async(req, res)=>{
    
    const axios = require('axios');

      const options = {
        method: 'GET',
        url: 'https://calories-burned-by-api-ninjas.p.rapidapi.com/v1/caloriesburned',
        params: {activity: 'push'},
        headers: {
          'X-RapidAPI-Key': 'b95f1a2863msh091c2e62f4baa54p12892ejsn0356392970bf',
          'X-RapidAPI-Host': 'calories-burned-by-api-ninjas.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
  }

  module.exports = { getUserProfile, saveAdditionalUserInfoById , testApi}
  