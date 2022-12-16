import { useState } from "react";
import Button from "@mui/material/Button";
import { faceRecognition } from "../../../services/ImageService";

// need 2 image

const FaceRecognition = () => {
  const [url1, setUrl1] = useState(null);
  const [img1, setImg1] = useState(null);
  const [img2, setImg2] = useState(null);
  const [url2, setUrl2] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadImageHandler = (e, number) => {
    let file = e.target.files[0];
    if (file) {
      if (number === 1) {
        setImg1(file);
        setUrl1(URL.createObjectURL(file));
      } else {
        setImg2(file);
        setUrl2(URL.createObjectURL(file));
      }
    }
  };

  const faceRecognitionHandler = () => {
    setIsLoading(true)
    let formData = new FormData()
    formData.append('image1', img1)
    formData.append('image2', img2)
    faceRecognition(formData).then((res) => {
        const data = new Uint8Array(res.data.result.data);
          const blob = new Blob([data], { type: "image/jpg" });
          const file = URL.createObjectURL(blob);
          setUrl2(file);
          setIsLoading(false);
    }).catch((err) => {
        console.log(err)
    }) 
  }

  if (!url1) {
    return (
      <div className="no-image">
        <Button
          variant="contained"
          component="label"
          onChange={(e) => loadImageHandler(e, 1)}
        >
          Upload Image 1
          <input hidden accept="image/*" type="file" />
        </Button>
      </div>
    );
  }
  if (!url2) {
    return (
      <div className="no-image">
        <Button
          variant="contained"
          component="label"
          onChange={(e) => loadImageHandler(e, 2)}
        >
          Upload Image 2
          <input hidden accept="image/*" type="file" />
        </Button>
      </div>
    );
  }
  if (url1 && url2){

      return (
        <div className="image_process">
          <div className="process">
            <div className="selected-image">
              {isLoading ? (
                <div className="d-flex justify-content-center align-items-center h-100">
                  <div class="spinner-grow" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <div className="two_image">
                    <img src={url1} alt="Selected File" />
                    <img src={url2} alt="Selected File" />
                </div>
              )}
            </div>
            <div className="button_handle">
              <Button
                variant="contained"
                component="label"
                onChange={(e) => loadImageHandler(e, 1)}
              >
                Choose Image 1
                <input hidden accept="image/*" type="file" />
              </Button>
              <Button
                variant="contained"
                component="label"
                onChange={(e) => loadImageHandler(e, 2)}
              >
                Choose Image 2
                <input hidden accept="image/*" type="file" />
              </Button>
              <Button
                variant="contained"
                component="label"
                onClick={faceRecognitionHandler}
              >
                Analyze
              </Button>
            </div>
          </div>
        </div>
      )
  }
};

export default FaceRecognition;
