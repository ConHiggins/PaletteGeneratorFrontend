import { useState } from "react";
import { useEffect } from "react";
import Button from "../../components/Button/Button";
import ColourBlock from "../../components/ColourBlock/ColourBlock";
import {
    fetchColours,
    fetchColoursBaseRGB,
    savePalette,
    hexToRGB,
    RGBtoHSL,
    HSLtoRGB,
} from "../../API/PaletteService";

import "./paletteContainer.scss";
import HueBlock from "../../components/HueBlock/HueBlock";

const PaletteContainer = ({ cols, type, name }) => {
    const [colours, setColours] = useState(cols);
    const [colourBlocks, setColourBlocks] = useState([]);
    const [paletteSize, setPaletteSize] = useState(12);
    const [paletteName, setPaletteName] = useState("");

    const className = `palette-container palette-container-${type}`;

    const createBlocks = (coloursArr) => {
        const animString = (i) => `blob 0.6s ease ${i}s forwards`;
        let blocks = [];
        for (let i = 0; i < coloursArr?.length; i++) {
            blocks[i] = (
                <ColourBlock
                    key={coloursArr[i]}
                    colour={coloursArr[i]}
                    animation={animString((i + 1) * 0.05)}
                    hexToRGB={hexToRGB}
                    RGBtoHSL={RGBtoHSL}
                    HSLtoRGB={HSLtoRGB}
                />
            );
        }
        return blocks;
    };

    const sortColdToWarm = (coloursArr) => {
        setColourBlocks(createBlocks(coloursArr.sort()));
    };

    const handleSlider = (e) => {
        setPaletteSize(e.target.value);
    };

    useEffect(() => {
        console.log("cols ", colours);
        setColourBlocks(createBlocks(colours));
        if (type == "homepage_1" || type == "homepage_2") {
            fetchColours(null, 20, setColours);
        }
    }, []);

    useEffect(() => {
        setColourBlocks([]);
        setColourBlocks(createBlocks(colours));
    }, [colours]);

    return (
        <>
            {type == "loaded" && <h1>{name}</h1>}
            <div className={className}>{colourBlocks}</div>

            {type == "generate" && (
                <>
                    <input
                        className="colours-amount"
                        type="range"
                        onChange={(event) => {
                            handleSlider(event);
                        }}
                    />
                    <h1>Size: {paletteSize}</h1>
                    <input
                        className="palette-name"
                        placeholder="Palette name..."
                        type="text"
                        onBlur={(e) => {
                            setPaletteName(e.target.value);
                        }}
                    />
                    <div className="generator-buttons">
                        <Button
                            classN="secondary"
                            onClick={() => {
                                fetchColours(null, paletteSize, setColours);
                            }}
                            value="Generate Palette"
                        />
                        <Button
                            classN="secondary"
                            onClick={() => {
                                if (colours.length < 1) {
                                    return alert("Please generate a palette");
                                } else if (paletteName == "") {
                                    return alert("Please provide palette name");
                                } else {
                                    savePalette(colours, paletteName);
                                }
                            }}
                            value="Save Palette"
                        />

                        <Button
                            classN="secondary"
                            onClick={() => {
                                sortColdToWarm(colours);
                            }}
                            value="Sort cold to warm"
                        />
                        <Button
                            classN="secondary"
                            onClick={() => {
                                fetchColoursBaseRGB(
                                    null,
                                    paletteSize,
                                    "r",
                                    setColours
                                );
                            }}
                            value="I'm feeling red..."
                        />
                        <Button
                            classN="secondary"
                            onClick={() => {
                                fetchColoursBaseRGB(
                                    null,
                                    paletteSize,
                                    "g",
                                    setColours
                                );
                            }}
                            value="I'm feeling green..."
                        />
                        <Button
                            classN="secondary"
                            onClick={() => {
                                fetchColoursBaseRGB(
                                    null,
                                    paletteSize,
                                    "b",
                                    setColours
                                );
                            }}
                            value="I'm feeling blue..."
                        />
                    </div>
                </>
            )}
        </>
    );
};

export default PaletteContainer;
