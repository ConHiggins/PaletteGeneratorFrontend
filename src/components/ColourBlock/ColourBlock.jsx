import { useState } from "react";
import HueBlock from "../HueBlock/HueBlock";
import "./colourBlock.scss";

const ColourBlock = ({ colour, animation, hexToRGB, RGBtoHSL, HSLtoRGB }) => {
    const [colourBG, setColourBG] = useState(colour);
    const [hues, toggleHues] = useState(false);
    return (
        <div
            className="colour-block-container"
            onClick={() => {
                toggleHues(!hues);
            }}
        >
            {hues && <HueBlock baseCol={colourBG} setColourBG={setColourBG} />}
            <div
                className="colour-block"
                style={{ backgroundColor: colourBG, animation: animation }}
            >
                <p className="colour-block-properties">{colourBG}</p>
                <p className="colour-block-properties">
                    {hexToRGB(colourBG).join()}
                </p>
            </div>
        </div>
    );
};

export default ColourBlock;
