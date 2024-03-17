const User = require("../models/UserModel");
const BodyMetrics = require("../models/bodyMetricsModel");


const recordBodyMetrics = async (req, res) => {
  try {
    const userId = req.params.id; 

    let selectedDate = ''
    const {date, chestCircumference, waistCircumference, hipCircumference} = req.body;
    if(date !== ""){
      selectedDate = date
    }

    
    const currentDate = new Date()
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    
    const recordDate = selectedDate !== "" ? selectedDate : formattedDate
    const foundRecord = await BodyMetrics.findOne({userId: userId, date : recordDate})

    const bodyMetricsData = {
      userId,
      date: selectedDate !== "" ? selectedDate : formattedDate,
      chestCircumference,
      waistCircumference,
      hipCircumference,
    };

    if(foundRecord){
      await BodyMetrics.findOneAndUpdate({date : recordDate},bodyMetricsData, { new: true } )
      return res.status(200).json({response: "Success", message: "Body metrics updated"})
    }

    const bodyMetrics = new BodyMetrics(bodyMetricsData)
    bodyMetrics.save() 

    res.status(200).json({ response: "Success", bodyMetrics });
  } catch (error) {
    res.status(200).json({ response: "Fail", message: "Error adding body metrics" });
  }
};

const getBodyMetrics  = async(req, res)=>{
  try {
    const userId = req.params.id; 

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ response: 'Fail', message: "User not found" });
    }

    const bodyMetrics = await BodyMetrics.find({userId: userId})

    res.status(200).json({response: "Success", bodyMetrics});
  } catch (error) {
    res.status(200).json({ response: 'Fail', message: "Error fetching Body Metrics" });
  }
}

const getBodyMetricsByDate  = async(req, res)=>{
  try {
    const userId = req.params.id; 
    const date = req.params.exerciseDate

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ response: 'Fail', message: "User not found" });
    }

    const bodyMetrics = await BodyMetrics.findOne({ userId, date });

    res.status(200).json({response: "Success", bodyMetrics});
  } catch (error) {
    res.status(200).json({ response: 'Fail', message: "Error fetching Body Metrics" });
  }
}


module.exports = { recordBodyMetrics, getBodyMetrics, getBodyMetricsByDate }