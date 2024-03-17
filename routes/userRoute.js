const express = require("express")
const router  = express.Router()
const { getUserProfile, saveAdditionalUserInfoById, testApi } = require("../controllers/userController")

router.get("/:id/profile", getUserProfile )
router.patch("/:id/profile", saveAdditionalUserInfoById)
router.get("/test", testApi)

module.exports = router