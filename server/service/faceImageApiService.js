const tf = require("@tensorflow/tfjs-node");
const faceapi = require("@vladmandic/face-api/dist/face-api.node");
const canvas = require("canvas");

const { Canvas, Image, ImageData } = canvas;
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

const path = require("path");
const modelPath = path.join(__dirname, "..", "models");

Promise.all([
  faceapi.nets.ssdMobilenetv1.loadFromDisk(modelPath),
  faceapi.nets.faceRecognitionNet.loadFromDisk(modelPath),
  faceapi.nets.faceLandmark68Net.loadFromDisk(modelPath),
  faceapi.nets.faceLandmark68TinyNet.loadFromDisk(modelPath),
  faceapi.nets.ageGenderNet.loadFromDisk(modelPath),
  faceapi.nets.faceExpressionNet.loadFromDisk(modelPath),
])
  .then((val) => {
    console.log(val);
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

const image = async (file) => {
  const decoded = tf.node.decodeImage(file);
  const casted = decoded.toFloat();
  const result = casted.expandDims(0);
  decoded.dispose();
  casted.dispose();
  return result;
};

const detectFace = async (img) => {
  const tensor = await image(img);
  const result = await faceapi.detectAllFaces(tensor);
  const canvasImg = await canvas.loadImage(img);
  const out = await faceapi.createCanvasFromMedia(canvasImg);
  await faceapi.draw.drawDetections(out, result);

  return await out.toBuffer("image/png");
};

const detectLandmark = async (img) => {
  const tensor = await image(img);
  const result = await faceapi.detectAllFaces(tensor).withFaceLandmarks();

  const canvasImg = await canvas.loadImage(img);
  const out = await faceapi.createCanvasFromMedia(canvasImg);
  await faceapi.draw.drawFaceLandmarks(out, result);

  return await out.toBuffer("image/png");
};

const detectAgeAndGender = async (img) => {
  const canvasImg = await canvas.loadImage(img);
  const out = await faceapi.createCanvasFromMedia(canvasImg);

  const tensor = await image(img);
  const result = await faceapi
    .detectAllFaces(tensor)
    .withFaceLandmarks()
    .withAgeAndGender();

  result.forEach((ele) => {
    let gender = ele.gender;
    let age = ele.age;
    let box = ele.detection.box;
    const drawBox = new faceapi.draw.DrawBox(box, {
      label: `Gender ${gender} - Age: ${age}`,
    });
    drawBox.draw(out);
  });

  return await out.toBuffer("image/png");
};

const detectExpression = async (img) => {
  const canvasImg = await canvas.loadImage(img);
  const out = await faceapi.createCanvasFromMedia(canvasImg);

  const tensor = await image(img);
  const result = await faceapi
    .detectAllFaces(tensor)
    .withFaceLandmarks()
    .withFaceExpressions();

  await faceapi.draw.drawDetections(out, result);
  await faceapi.draw.drawFaceExpressions(out, result, 0.5);

  return await out.toBuffer("image/png");
};

const faceRecognition = async (refer, queryImg) => {
  const tensor = await image(refer);
  const result = await faceapi
    .detectAllFaces(tensor)
    .withFaceLandmarks()
    .withFaceDescriptors();

  if (!result.length) {
    return "No Faces Founded In Refer Image";
  }

  const faceMatcher = new faceapi.FaceMatcher(result);

  const queryImageTensor = await image(queryImg);
  const canvasImg = await canvas.loadImage(queryImg);
  const out = await faceapi.createCanvasFromMedia(canvasImg);
  const allFaces = await faceapi
    .detectAllFaces(queryImageTensor)
    .withFaceLandmarks()
    .withFaceDescriptors();

  const results = allFaces.map((fd) =>
    faceMatcher.findBestMatch(fd.descriptor)
  );
  results.forEach((bestMatch, i) => {
    const box = allFaces[i].detection.box;
    const text = bestMatch.toString();
    const drawBox = new faceapi.draw.DrawBox(box, { label: text });
    drawBox.draw(out);
  });
  return out.toBuffer("image/png");
};

module.exports = {
  face: detectFace,
  landmark: detectLandmark,
  ageGender: detectAgeAndGender,
  expression: detectExpression,
  recognition: faceRecognition,
};
