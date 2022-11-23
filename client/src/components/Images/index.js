import { useState } from "react";
import {
  ageAndGenderDetection,
  expressionDetection,
  faceDetection,
  landmarkDetection,
} from "../../services/ImageService";

const buttonFunc = [
  { name: "face", value: "Face Detection" },
  { name: "landmark", value: "Landmark Detection" },
  { name: "age-gender", value: "Age Estimate && Gender Recognition" },
  { name: "expression", value: "Face Expression Detection" },
];

const Images = () => {
  const [url, setUrl] = useState(null);
  const [img, setImg] = useState(null);
  const [resultDetection, setResulDetection] = useState(null);
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
    let result;
    if (img) {
      let formData = new FormData();
      formData.append("img", img);
      switch (e.target.name) {
        case "face":
          result = faceDetection(formData);
          break;
        case "landmark":
          result = landmarkDetection(formData);
          break;
        case "age-gender":
          result = ageAndGenderDetection(formData);
          break;
        case "expression":
          result = expressionDetection(formData);
          break;
        default:
          break;
      }

      result
        .then((res) => {
          const data = new Uint8Array(res.data.result.data);
          const blob = new Blob([data], { type: "image/jpg" });
          const file = URL.createObjectURL(blob);
          setResulDetection(file);
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
        <input type="file" onChange={loadImageHandler} />
      </div>
    );
  return (
    <div className="image_process">
      <div className="upload-image">
        <div className="selected-image">
          <img src={url} alt="Selected File" />
        </div>

        <div className="input-image">
          <input
            type="file"
            id="img"
            style={{ display: "None" }}
            onChange={loadImageHandler}
          />
          <label htmlFor="img" className="btn btn-outline-dark">
            Choose another image
          </label>
        </div>
      </div>
      <div className="process">
        <div className="selected-image">
          {isLoading ? (
            <div className="d-flex justify-content-center align-items-center h-100">
              <div class="spinner-grow" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <img
              src={resultDetection ? resultDetection : url}
              alt="Selected File"
            />
          )}
        </div>
        <div className="button_handle">
          {buttonFunc.map((item, i) => (
            <button
              key={i}
              name={item.name}
              className="btn btn-outline-dark"
              onClick={faceDetectionHandler}
            >
              {item.value}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Images;
