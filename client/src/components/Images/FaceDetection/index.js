import { useState, useEffect } from "react";
import {
  faceDetection,
  ageAndGenderDetection,
  expressionDetection,
  landmarkDetection,
} from "../../../services/ImageService";
import Button from "@mui/material/Button";

const FaceDetection = (props) => {
  const [url, setUrl] = useState(null);
  const [img, setImg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadImageHandler = (e) => {
    let file = e.target.files[0];
    if (file) {
      setImg(file);
      setUrl(URL.createObjectURL(file));
    }
  };

  const faceDetectionHandler = async (e) => {
    setIsLoading(true);
    if (img) {
      let formData = new FormData();
      formData.append("img", img);
      let result;
      switch (props.type) {
        case "face":
          result = faceDetection(formData);
          break;
        case "landmark":
          result = landmarkDetection(formData);
          break;
        case "expression":
          result = expressionDetection(formData);
          break;
        case "age-gender":
          result = ageAndGenderDetection(formData);
          break;
        default:
          break;
      }
      result
        .then((res) => {
          const data = new Uint8Array(res.data.result.data);
          const blob = new Blob([data], { type: "image/jpg" });
          const file = URL.createObjectURL(blob);
          setUrl(file);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  if (!url)
    return (
      <div className="no-image">
        <Button
          variant="contained"
          component="label"
          onChange={loadImageHandler}
        >
          Upload
          <input hidden accept="image/*" type="file" />
        </Button>
      </div>
    );
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
            <img src={url} alt="Selected File" />
          )}
        </div>
        <div className="button_handle">
          <Button
            variant="contained"
            component="label"
            onChange={loadImageHandler}
          >
            Choose from disk
            <input hidden accept="image/*" type="file" />
          </Button>
          <Button
            variant="contained"
            component="label"
            onClick={faceDetectionHandler}
          >
            Detect
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FaceDetection;
