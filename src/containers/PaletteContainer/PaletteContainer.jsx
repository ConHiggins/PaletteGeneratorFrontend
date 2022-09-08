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
    fibonacciPalette,
} from "../../API/PaletteService";

import "./paletteContainer.scss";
import HueBlock from "../../components/HueBlock/HueBlock";

const PaletteContainer = ({ cols, type, name, createdBy }) => {
    const [colours, setColours] = useState(cols);
    const [colourBlocks, setColourBlocks] = useState([]);
    const [paletteSize, setPaletteSize] = useState(12);
    let paletteName = "";
    let username = "";

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
            {type == "loaded" && (
                <h2 className="palette-name">
                    {name} by {createdBy}
                </h2>
            )}

            <div className={className}>{colourBlocks}</div>

            {type == "generate" && (
                <>
                    <input
                        className="colours-amount"
                        type="range"
                        min={2}
                        max={24}
                        value={paletteSize}
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
                            paletteName = e.target.value;
                        }}
                    />
                    <input
                        className="palette-name"
                        placeholder="Your name..."
                        type="text"
                        onBlur={(e) => {
                            username = e.target.value;
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
                                } else if (username == "") {
                                    return alert("Please provide your name");
                                } else {
                                    savePalette(colours, paletteName, username);
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
                        <Button
                            classN="secondary"
                            onClick={() => {
                                setColours(
                                    fibonacciPalette(colours[0], paletteSize)
                                );
                            }}
                            value="fibonacci..?"
                        />
                    </div>
                </>
            )}
        </>
    );
};

export default PaletteContainer;
