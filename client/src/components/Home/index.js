import { Link, Outlet } from "react-router-dom"

const Home = () => {
    return (
        <div className="home">
            <div className="sidebar">
                
            <h1>Welcome!</h1>
            <div className="image_func">
                <h3>IMAGE</h3>
                <Link to="image/face" className="btn btn-outline-dark">Face Detection</Link>
                <Link to="image/landmark" className="btn btn-outline-dark">Landmark Detection</Link>
                <Link to="image/age-gender" className="btn btn-outline-dark">Age Anender Detection</Link>
                <Link to="image/expression" className="btn btn-outline-dark">Face Expression</Link>
                <Link to="image/face-recognition" className="btn btn-outline-dark">Face Recognition</Link>
                <Link to="image/face-similarity" className="btn btn-outline-dark">Face Similarity</Link>
            </div>

            <div className="image_func">
                <h3>VIDEO</h3>
                <Link to="video/face-tracking" className="btn btn-outline-dark">Face Tracking</Link>
            </div>

            <div className="image_func">
                <h3>WEBCAM</h3>
                <Link to="webcam/face" className="btn btn-outline-dark">Face Tracking</Link>
                <Link to="webcam/expression" className="btn btn-outline-dark">Face Expression Recognition</Link>
            </div>
            </div>
            <Outlet />
        </div>
    )
}

export default Home