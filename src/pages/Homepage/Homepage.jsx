import "./Homepage.scss";
import PaletteContainer from "../../containers/PaletteContainer/PaletteContainer";
import AllPalettes from "../../containers/AllPalettes/AllPalettes";
const Homepage = () => {
    return (
        <div className="homepage">
            <div className="homepage-splash">
                <h1 className="homepage-splash-title">
                    Welcome to the generator!
                </h1>
                <PaletteContainer type="homepage_1" />
                <PaletteContainer type="homepage_2" />
                <PaletteContainer type="homepage_1" />
                <PaletteContainer type="homepage_2" />
                <PaletteContainer type="homepage_1" />
                <PaletteContainer type="homepage_2" />
            </div>
            <AllPalettes />
        </div>
    );
};

export default Homepage;
