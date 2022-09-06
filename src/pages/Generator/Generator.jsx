import "./Generator.scss";
import Navbar from "../../components/Navbar/Navbar";
import PaletteContainer from "../../containers/PaletteContainer/PaletteContainer";

const Generator = () => {
    return (
        <>
            <Navbar />
            <div className="generator">
                <PaletteContainer type="generate" cols={[]} />;
            </div>
        </>
    );
};

export default Generator;
