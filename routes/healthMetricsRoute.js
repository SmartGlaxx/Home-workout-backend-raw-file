const express = require("express")
const router  = express.Router()
const {recordHealthMetrics, getHealthMetrics, getHealthMetricsByDate,
     updateHealthRecord} = require("../controllers/healthMetricsController")

router.post("/:id/health-metrics", recordHealthMetrics )
router.get("/:id/health-metrics", getHealthMetrics )
router.get("/:id/:exerciseDate/health-metrics", getHealthMetricsByDate)
router.patch("/:id/:exerciseDate/health-metrics", updateHealthRecord )

module.exports = router