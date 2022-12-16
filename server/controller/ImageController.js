const faceApiService = require("../service/faceImageApiService")

exports.faceDetection =async (req, res) => {
    const {img} = req.files
    const result = await faceApiService.face(img.data)
    res.json({"result": result})
}

exports.landmarkDetection = async (req, res) => {
    const {img} = req.files
    const result = await faceApiService.landmark(img.data)
    res.json({"result": result})
}   

exports.ageAndGenderDetection = async (req, res) => {
    const {img} =  req.files;
    const result = await faceApiService.ageGender(img.data)
    res.json({"result": result})
}

exports.expressionDetection = async (req, res) => {
    const {img } = req.files
    const result = await faceApiService.expression(img.data)
    res.json({"result": result})
}

exports.faceRecognition = async (req, res) => {
    const {image1, image2} = req.files;
    const result = await faceApiService.recognition(image1.data, image2.data)
    res.json({"result": result})
}