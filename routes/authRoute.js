const express = require("express")
const router  = express.Router()
const {signUpUser, signInUser} = require("../controllers/authController")

router.post("/sign-up", signUpUser )
router.post("/sign-in", signInUser )

module.exports = router

