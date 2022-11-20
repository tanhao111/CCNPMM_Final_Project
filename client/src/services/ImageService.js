import axios from 'axios'
const URL = "http://localhost:3003"

export const faceDetection = async (file) => {
    const formData = new FormData()
    formData.append('img', file)
    return await axios({
        url:`${URL}/face-detection`,
        method:"POST",
        data: formData,
    })
}