import axios from 'axios'
const URL = "http://localhost:3003"

export const faceDetection = async (data) => {
    return await axios({
        url:`${URL}/face-detection`,
        method:"POST",
        data: data,
    })
}

export const landmarkDetection = async (data) => {
    return await axios({
        url:`${URL}/landmark-detection`,
        method:"POST",
        data: data
    })
}

export const ageAndGenderDetection = async (data) => {
    return await axios({
        url:`${URL}/age-gender`,
        method:"POST",
        data: data
    })
}

export const expressionDetection = async (data) => {
    return await axios({
        url:`${URL}/expression`,
        method:"POST",
        data: data
    })
}