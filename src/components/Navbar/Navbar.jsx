import { Link } from "react-router-dom";
import "./Navbar.scss";

const Navbar = () => {
    return (
        <div className="navbar">
            <Link to={"/"} className="navbar-item">
                Home
            </Link>
            <Link to={"/generate"} className="navbar-item">
                Generator
            </Link>
            <Link to={"/palettes"} className="navbar-item">
                All Palettes
            </Link>
        </div>
    );
};

export default Navbar;
