const tf = require("@tensorflow/tfjs-node")
const faceapi = require("@vladmandic/face-api/dist/face-api.node")
const canvas = require('canvas')
const {Canvas, Image, ImageData} = canvas
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

const path = require("path")

let optionsSSDMobileNet;


const image = async (file) => {
    const decoded = tf.node.decodeImage(file);  
    const casted = decoded.toFloat();
    const result = casted.expandDims(0);
    decoded.dispose();
    casted.dispose();
    return result;
}

const detect = async(tensor) => {
    const result = await faceapi.detectAllFaces(tensor, optionsSSDMobileNet);
    return result;
}

const main = async (file) => {
    console.log("FaceAPI single-process test");

    await faceapi.tf.setBackend("tensorflow");
    await faceapi.tf.enableProdMode();
    await faceapi.tf.ENV.set("DEBUG", false);
    await faceapi.tf.ready();
  
    console.log(
      `Version: TensorFlow/JS ${faceapi.tf?.version_core} FaceAPI ${
        faceapi.version?.faceapi
      } Backend: ${faceapi.tf?.getBackend()}`
    );
  
    console.log("Loading FaceAPI models");
    const modelPath = path.join(__dirname, "..","models");
    await faceapi.nets.ssdMobilenetv1.loadFromDisk(modelPath);
    optionsSSDMobileNet = new faceapi.SsdMobilenetv1Options({
      minConfidence: 0.5,
    });
  
    const tensor = await image(file);
    const result = await detect(tensor);
    // tensor.dispose();
    const canvasImg = await canvas.loadImage(file);
    const out = await faceapi.createCanvasFromMedia(canvasImg);
    await faceapi.draw.drawDetections(out, result);
  
  
    return await out.toBuffer("image/png");
}

module.exports = {
    detect: main
}