const mongoose = require("mongoose")

const BodyMetricsSchema = new mongoose.Schema({
      userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
      },
      date: {
        type: String,
      },
      chestCircumference: {
        type: Number, 
        required: [true, "Please enter your chest circumference"],
      },
      waistCircumference: {
        type: Number, 
        required: [true, "Please enter your waist circumference"],
      },
      hipCircumference: {
        type: Number, 
        required: [true, "Please enter your hip circumference"],
      },
})


  module.exports = mongoose.model('BodyMetrics', BodyMetricsSchema)