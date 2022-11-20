import { Link, Outlet } from "react-router-dom"

const Home = () => {
    return (
        <div className="home">
            <div className="sidebar">
                
            <h1>Welcome!</h1>
            <Link to="image" className="btn btn-outline-dark">IMAGE</Link>
            <Link to="video" className="btn btn-outline-dark">VIDEO</Link>
            </div>
            <Outlet />
        </div>
    )
}

export default Home