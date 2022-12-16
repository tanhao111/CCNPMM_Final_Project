import {useParams} from 'react-router-dom'

import FaceDetection from './FaceDetection'
import FaceRecognition from './FaceRecognition';

const Image = () => {
  let {func} = useParams();
  return(
    <div className="process_home">
      {{
        'face': <FaceDetection type={func} />,
        'landmark': <FaceDetection type={func}/>,
        'age-gender': <FaceDetection type={func}/>,
        'expression': <FaceDetection type={func}/>,
        'face-recognition': <FaceRecognition />
      }[func]}
    </div>
  )
}

export default Image