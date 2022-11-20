const express = require("express")
const { faceDetection } = require("../controller/ImageController")
const router = express.Router()

router.post("/face-detection",faceDetection)

module.exports = router