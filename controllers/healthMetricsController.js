const User = require("../models/UserModel");
const HealthMetrics = require("../models/healthMetricsModel");


const recordHealthMetrics = async (req, res) => {
  try {
    const userId = req.params.id; 

    let selectedDate = ''
    const {date, systolicPressure, diastolicPressure, restingHeartRate } = req.body;
    if(date !== ""){
      selectedDate = date
    }
    const currentDate = new Date()
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    const recordDate = selectedDate !== "" ? selectedDate : formattedDate
    const foundRecord = await HealthMetrics.findOne({userId: userId, date : recordDate})

    const healthMetricsData = {
      userId,
      date: selectedDate !== "" ? selectedDate : formattedDate,
      systolicPressure,
      diastolicPressure,
      restingHeartRate,
    };

    if(foundRecord){
      await HealthMetrics.findOneAndUpdate({date : recordDate},healthMetricsData, { new: true } )
      return res.status(200).json({response: "Success", message: "Health metrics updated"})
    }


    const healthMetrics = new HealthMetrics(healthMetricsData)
    healthMetrics.save() 

    res.status(200).json({ response: "Success", healthMetrics });
  } catch (error) {
    res.status(200).json({ response: "Fail", message: "Error adding health metrics" });
  }
};

const getHealthMetrics = async (req, res) => {
  try {
    const userId = req.params.id; 

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ response: 'Fail', message: "User not found" });
    }

    const healthMetrics = await HealthMetrics.find({userId: userId})

    res.status(200).json({response: "Success", healthMetrics});
  } catch (error) {
    res.status(200).json({ response: 'Fail', message: "Error fetching Health Metrics" });
  }
};

const getHealthMetricsByDate = async (req, res) => {
  try {
    const userId = req.params.id; 
    const date = req.params.exerciseDate

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ response: 'Fail', message: "User not found" });
    }

    const healthMetrics = await HealthMetrics.findOne({ userId, date });

    res.status(200).json({response: "Success", healthMetrics});
  } catch (error) {
    res.status(200).json({ response: 'Fail', message: "Error fetching Health Metrics" });
  }
};


const updateHealthRecord = async (req, res) => {
  try {
    const userId = req.params.id;
    const date = req.params.exerciseDate

    // const currentDate = new Date()
    // const year = currentDate.getFullYear();
    // const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
    // const day = String(currentDate.getDate()).padStart(2, '0');
    
    const { caloriesBurned } = req.body;

    if (!userId ) {
      return res.status(400).json({ response: "Fail", message: "UserId and date are required fields" });
    }
    
    const existingRecord = await HealthMetrics.findOne({ userId, date });
console.log(existingRecord)
    if (!existingRecord) {
      return res.status(200).json({ response: "Fail", message: "Health record not found for the specified userId and date" });
    }

    existingRecord.caloriesBurned = caloriesBurned;
    console.log(existingRecord)
    await existingRecord.save();

    res.status(200).json({ response: "Success", healthMetrics: existingRecord });
  } catch (error) {
    console.error(error);
    res.status(200).json({ response: "Fail", message: "Error adding caloried burned" });
  }
};


module.exports = { recordHealthMetrics, getHealthMetrics, getHealthMetricsByDate,
   updateHealthRecord }