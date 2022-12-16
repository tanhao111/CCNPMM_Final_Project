const express = require("express");
const {
  faceDetection,
  landmarkDetection,
  ageAndGenderDetection,
  expressionDetection,
  faceRecognition,
} = require("../controller/ImageController");
const router = express.Router();

router.post("/face-detection", faceDetection);

router.post("/landmark-detection", landmarkDetection);

router.post("/age-gender", ageAndGenderDetection);

router.post("/expression", expressionDetection);

router.post("/face-recognition", faceRecognition);

module.exports = router;
