const express = require("express")
const router  = express.Router()
const {recordBodyMetrics, getBodyMetrics, getBodyMetricsByDate} = require("../controllers/bodyMetricsController")

router.post("/:id/body-metrics", recordBodyMetrics )
router.get("/:id/body-metrics", getBodyMetrics )
router.get("/:id/:exerciseDate/body-metrics", getBodyMetricsByDate )

module.exports = router