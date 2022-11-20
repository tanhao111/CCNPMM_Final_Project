const faceApiService = require("../service/faceApiService")

exports.faceDetection =async (req, res) => {
    const {img} = req.files
    const result = await faceApiService.detect(img.data)
    res.json({"result": result})
}