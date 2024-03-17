const mongoose = require("mongoose")

const HealthMetricsSchema = new mongoose.Schema({
      userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
      },
      date: {
        type: String,
      },
      systolicPressure: {
        type: Number, 
        required: [true, "Please enter your systolic pressure"],
      },
      diastolicPressure: {
        type: Number, 
        required: [true, "Please enter your diastolic pressure"],
      },
      restingHeartRate: {
        type: Number, 
        required: [true, "Please enter your resting heart rate"],
      },
      caloriesBurned: {
        type: Number
      }
})


  module.exports = mongoose.model('HealthMetrics', HealthMetricsSchema)