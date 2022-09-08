import { useState } from "react";
import HueBlock from "../HueBlock/HueBlock";
import Button from "../../components/Button/Button";
import "./colourBlock.scss";

const ColourBlock = ({ colour, animation, hexToRGB, RGBtoHSL, HSLtoRGB }) => {
    const [colourBG, setColourBG] = useState(colour);
    const [hues, toggleHues] = useState(false);
    const [hsl, setHsl] = useState("");
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
                <Button
                    classN="colour-block"
                    value="hue"
                    onClick={() => {
                        setHsl("h");
                        toggleHues(!hues);
                    }}
                />
                <Button
                    classN="colour-block"
                    value="sat"
                    onClick={() => {
                        setHsl("s");
                        toggleHues(!hues);
                    }}
                />
                <Button
                    classN="colour-block"
                    value="lum"
                    onClick={() => {
                        setHsl("l");
                        toggleHues(!hues);
                    }}
                />

                <p className="colour-block-properties">
                    {hexToRGB(colourBG).join()}
                </p>
            </div>
        </div>
    );
};

export default ColourBlock;
