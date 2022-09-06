import { Link } from "react-router-dom";
import "./Navbar.scss";

const Navbar = () => {
    return (
        <div className="navbar">
            <Link to={"/"}>Home</Link>
            <Link to={"/generate"}>Generator</Link>
            <Link to={"/palettes"}>All palettes</Link>
        </div>
    );
};

export default Navbar;
