import { Link } from "react-router-dom";

const Nav = () =>{
    return(
        <div className="navbar">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li> <Link to="/register">Register</Link></li>
                <li> <Link to="/login">Login</Link></li>
                <li> <Link to="/notes">Notes</Link></li>
            </ul>
        </div>
    )
}

export default Nav;