const express = require("express");
const {
  faceDetection,
  landmarkDetection,
  ageAndGenderDetection,
  expressionDetection,
} = require("../controller/ImageController");
const router = express.Router();

router.post("/face-detection", faceDetection);

router.post("/landmark-detection", landmarkDetection);

router.post("/age-gender", ageAndGenderDetection);

router.post("/expression", expressionDetection);

module.exports = router;
