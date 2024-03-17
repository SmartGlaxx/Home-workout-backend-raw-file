const mongoose = require("mongoose")
const validate = require("validator")
const bcrypt = require("bcryptjs")


const UserSchema = new mongoose.Schema({
    firstname: {
        type : String,
        trim: true,
        required: [true, "Please enter your first name"],
    },
    lastname: {
        type : String,
        trim: true,
        required: [true, "Please enter your last name"],
    },
    username: {
        type : String,
        trim: true,
        required: [true, "Please enter your username"],
    },
    email: {
        type : String,
        trim: true,
        required: [true, "Please enter your email"],
        validate:{
            validator:validate.isEmail,
            message:"Please enter a valid email"
        }
    },
    password: {
        type : String,
        required: [true, "Please enter your password"],
        minlength: 8
    },
    age: {
      type: Number
    },
    gender: {
      type: String,
      enum: ['Male', 'Female'],
    },
    height: {
      type: Number,
      min: [1, 'Height must be greater than 0'],
    },
    weight: {
      type: Number,
      min: [1, 'Weight must be greater than 0'],
    },
    medicalHistory: {
      type: String,
      trim: true,
    },
    fitnessLevel: {
      type: String
    },
    fitnessGoals: {
        type: [String]
    }
}) 

UserSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(12)
    this.password = await bcrypt.hash(this.password, salt)
})


module.exports = mongoose.model('User', UserSchema)