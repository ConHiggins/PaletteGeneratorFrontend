import "./Homepage.scss";
import PaletteContainer from "../../containers/PaletteContainer/PaletteContainer";
import AllPalettes from "../../containers/AllPalettes/AllPalettes";
import Navbar from "../../components/Navbar/Navbar";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
const Homepage = () => {
    return (
        <div className="homepage">
            <Navbar />
            <div className="homepage-splash">
                <div className="homepage-splash-title">
                    <h1>Welcome to Chromatic!</h1>
                    <Link to={"/generate"}>
                        <Button value="Let's go" classN={"primary"} />
                    </Link>
                </div>
                <PaletteContainer type="homepage_1" />
                <PaletteContainer type="homepage_2" />
                <PaletteContainer type="homepage_1" />
                <PaletteContainer type="homepage_2" />
                <PaletteContainer type="homepage_1" />
                <PaletteContainer type="homepage_2" />
            </div>
        </div>
    );
};

export default Homepage;
