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
  faceapi.nets.faceExpressionNet.loadFromDisk(modelPath)
]).then((val) => {
  console.log(val)
}).catch((err) => {
  console.log(err)
  process.exit(1)
})


// let optionsSSDMobileNet;

const image = async (file) => {
  const decoded = tf.node.decodeImage(file);
  const casted = decoded.toFloat();
  const result = casted.expandDims(0);
  decoded.dispose();
  casted.dispose();
  return result;
};

// const detect = async (tensor) => {
//   const result = await faceapi.detectAllFaces(tensor, optionsSSDMobileNet);
//   return result;
// };

// const landmarkDetect = async (tensor) => {
//   return await faceapi
//     .detectAllFaces(tensor)
//     .withFaceLandmarks();
// };

// const main = async (file, _case) => {
//   console.log("FaceAPI single-process test");

//   await faceapi.tf.setBackend("tensorflow");
//   await faceapi.tf.enableProdMode();
//   await faceapi.tf.ENV.set("DEBUG", false);
//   await faceapi.tf.ready();

//   console.log(
//     `Version: TensorFlow/JS ${faceapi.tf?.version_core} FaceAPI ${
//       faceapi.version?.faceapi
//     } Backend: ${faceapi.tf?.getBackend()}`
//   );

//   console.log("Loading FaceAPI models");
//   await faceapi.nets.ssdMobilenetv1.loadFromDisk(modelPath);
//   optionsSSDMobileNet = new faceapi.SsdMobilenetv1Options({
//     minConfidence: 0.5,
//   });

//   const tensor = await image(file);
//   let result;
//   switch (_case) {
//     case "face":
//       result = await detect(tensor);
//       break;
//     case "landmark":
//       await faceapi.nets.faceRecognitionNet.loadFromDisk(modelPath);
//       await faceapi.nets.faceLandmark68Net.loadFromDisk(modelPath)

//       result = await landmarkDetect(tensor);
//     default:
//       break;
//   }
//   // tensor.dispose();
//   const canvasImg = await canvas.loadImage(file);
//   const out = await faceapi.createCanvasFromMedia(canvasImg);
//   await faceapi.draw.drawDetections(out, result);

//   return await out.toBuffer("image/png");
// };


const detectFace = async (img) =>{
  const tensor = await image(img);
  const result = await faceapi.detectAllFaces(tensor)
  const canvasImg = await canvas.loadImage(img);
  const out = await faceapi.createCanvasFromMedia(canvasImg);
  await faceapi.draw.drawDetections(out, result);

  return await out.toBuffer("image/png");
}

const detectLandmark = async (img) => {
  const tensor = await image(img)
  const result = await faceapi.detectAllFaces(tensor).withFaceLandmarks()

  console.log(result)
  const canvasImg = await canvas.loadImage(img);
  const out = await faceapi.createCanvasFromMedia(canvasImg);
  await faceapi.draw.drawFaceLandmarks(out, result);

  return await out.toBuffer("image/png");
  // return result
}

const detectAgeAndGender = async (img) => {
  const canvasImg = await canvas.loadImage(img);
  const out = await faceapi.createCanvasFromMedia(canvasImg);

  const tensor = await image(img)
  const result = await faceapi.detectAllFaces(tensor).withFaceLandmarks().withAgeAndGender()

  result.forEach(ele => {
    let gender =  ele.gender
    let age =  ele.age
    let box = ele.detection.box
    const drawBox = new faceapi.draw.DrawBox(box, { label: `Gender ${gender} - Age: ${age}` })
    drawBox.draw(out)
  })

  return await out.toBuffer("image/png");
} 


const detectExpression = async (img) => {
  const canvasImg = await canvas.loadImage(img)
  const out = await faceapi.createCanvasFromMedia(canvasImg)

  const tensor = await image(img)
  const result = await faceapi.detectAllFaces(tensor).withFaceLandmarks().withFaceExpressions()

  await faceapi.draw.drawDetections(out, result)
  await faceapi.draw.drawFaceExpressions(out, result, 0.5)

  return await out.toBuffer("image/png");
}

module.exports = {
  face: detectFace,
  landmark: detectLandmark,
  ageGender: detectAgeAndGender,
  expression: detectExpression
}