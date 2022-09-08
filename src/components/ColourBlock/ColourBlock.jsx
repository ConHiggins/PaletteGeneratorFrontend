import { useState } from "react";
import HueBlock from "../HueBlock/HueBlock";
import Button from "../../components/Button/Button";
import "./colourBlock.scss";
import { rgbToHex } from "../../API/PaletteService";

const ColourBlock = ({ colour, animation, hexToRGB, RGBtoHSL, HSLtoRGB }) => {
    const [colourBG, setColourBG] = useState(colour);
    const [hues, toggleHues] = useState(false);
    const [hsl, setHsl] = useState("");
    const contrast = (col) => {
        let colRGB = hexToRGB(col);
        let colHSL = RGBtoHSL(colRGB[0], colRGB[1], colRGB[2]);

        colHSL[0] = colHSL[0] + 100;
        if (colHSL[0] > 360) {
            colHSL[0] -= 360;
        }

        colRGB = HSLtoRGB(colHSL[0], 50, colHSL[2]);

        return rgbToHex(colRGB[0], colRGB[1], colRGB[2]);
    };

    const contrastCol = contrast(colourBG);

    return (
        <div
            className="colour-block-container"
            onMouseLeave={() => {
                toggleHues(false);
            }}
        >
            {hues && (
                <HueBlock
                    baseCol={colourBG}
                    setColourBG={setColourBG}
                    hsl={hsl}
                />
            )}
            <div
                className="colour-block"
                style={{ backgroundColor: colourBG, animation: animation }}
            >
                <p className="colour-block-properties">{colourBG}</p>
                <div className="buttons">
                    <div className="button-wrapper">
                        <Button
                            classN="colour-block"
                            value="Hue"
                            styling={{ backgroundColor: contrastCol }}
                            onClick={() => {
                                setHsl("h");
                                toggleHues(!hues);
                            }}
                        />
                    </div>
                    <div className="button-wrapper">
                        <Button
                            classN="colour-block"
                            value="Sat"
                            styling={{ backgroundColor: contrastCol }}
                            onClick={() => {
                                setHsl("s");
                                toggleHues(!hues);
                            }}
                        />
                    </div>
                    <div className="button-wrapper">
                        <Button
                            classN="colour-block"
                            value="Lum"
                            styling={{ backgroundColor: contrastCol }}
                            onClick={() => {
                                setHsl("l");
                                toggleHues(!hues);
                            }}
                        />
                    </div>
                </div>
                <p className="colour-block-properties">
                    {hexToRGB(colourBG).join()}
                </p>
            </div>
        </div>
    );
};

export default ColourBlock;
