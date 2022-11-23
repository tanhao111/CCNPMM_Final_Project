const faceApiService = require("../service/faceApiService")

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