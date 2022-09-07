import {
    hexToRGB,
    HSLtoRGB,
    RGBtoHSL,
    rgbToHex,
} from "../../API/PaletteService";
import "./HueBlock.scss";

const HueBlock = ({ baseCol, setColourBG }) => {
    const huesArray = (col) => {
        let hues = [];
        const colRGB = hexToRGB(col);
        for (let i = 0; i < 15; i++) {
            const colHSL = RGBtoHSL(colRGB[0], colRGB[1], colRGB[2]);
            const hueRGB = HSLtoRGB(colHSL[0], colHSL[1], i * (255 / 40));
            const finalCol = rgbToHex(hueRGB[0], hueRGB[1], hueRGB[2]);
            hues[i] = (
                <div
                    className="hue-slice"
                    style={{ backgroundColor: finalCol }}
                    onClick={() => {
                        setColourBG(finalCol);
                    }}
                ></div>
            );
        }

        return hues;
    };
    return <div className="hue-block">{huesArray(baseCol)}</div>;
};

export default HueBlock;
