import Navbar from "../../components/Navbar/Navbar";
import PaletteContainer from "../../containers/PaletteContainer/PaletteContainer";

const Generator = () => {
    return (
        <div className="generator">
            <Navbar />
            <PaletteContainer type="generate" cols={[]} />;
        </div>
    );
};

export default Generator;
