import {
    hexToRGB,
    HSLtoRGB,
    RGBtoHSL,
    rgbToHex,
} from "../../API/PaletteService";
import "./HueBlock.scss";

const HueBlock = ({ baseCol, setColourBG, hsl }) => {
    const huesArray = (col) => {
        let hues = [];
        const colRGB = hexToRGB(col);
        for (let i = 0; i < 15; i++) {
            const colHSL = RGBtoHSL(colRGB[0], colRGB[1], colRGB[2]);
            const hueRGB = HSLtoRGB(i * (360 / 15), colHSL[1], colHSL[2]);
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

    const satArray = (col) => {
        let sats = [];
        const colRGB = hexToRGB(col);
        for (let i = 0; i < 15; i++) {
            const colHSL = RGBtoHSL(colRGB[0], colRGB[1], colRGB[2]);
            const hueRGB = HSLtoRGB(colHSL[0], i * (255 / 40), colHSL[2]);
            const finalCol = rgbToHex(hueRGB[0], hueRGB[1], hueRGB[2]);
            sats[i] = (
                <div
                    className="hue-slice"
                    style={{ backgroundColor: finalCol }}
                    onClick={() => {
                        setColourBG(finalCol);
                    }}
                ></div>
            );
        }

        return sats;
    };

    const lightnessArray = (col) => {
        let lights = [];
        const colRGB = hexToRGB(col);
        for (let i = 0; i < 15; i++) {
            const colHSL = RGBtoHSL(colRGB[0], colRGB[1], colRGB[2]);
            const hueRGB = HSLtoRGB(colHSL[0], colHSL[1], i * (255 / 40));
            const finalCol = rgbToHex(hueRGB[0], hueRGB[1], hueRGB[2]);
            lights[i] = (
                <div
                    className="hue-slice"
                    style={{ backgroundColor: finalCol }}
                    onClick={() => {
                        setColourBG(finalCol);
                    }}
                ></div>
            );
        }

        return lights;
    };

    if (hsl == "h")
        return <div className="hue-block">{huesArray(baseCol)}</div>;
    else if (hsl == "s")
        return <div className="hue-block">{satArray(baseCol)}</div>;
    else if (hsl == "l")
        return <div className="hue-block">{lightnessArray(baseCol)}</div>;
};

export default HueBlock;
