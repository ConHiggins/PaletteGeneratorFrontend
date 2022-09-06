import { useState } from "react";
import { useEffect } from "react";
import Button from "../../components/Button/Button";
import ColourBlock from "../../components/ColourBlock/ColourBlock";

import "./paletteContainer.scss";

const PaletteContainer = ({ cols, type, name }) => {
    const [colours, setColours] = useState(cols);
    const [colourBlocks, setColourBlocks] = useState([]);
    const [paletteSize, setPaletteSize] = useState(12);
    const [paletteName, setPaletteName] = useState("");

    const className = `palette-container palette-container-${type}`;

    const fetchColours = async (colour, size) => {
        try {
            const response = await fetch(
                "http://localhost:8080/palettes/create",
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        Color: colour,
                        size: size,
                    }),
                }
            );
            if (!response.ok) {
                throw new Error(response.status + " error with request");
            }
            const data = await response.json();
            setColours(data);
        } catch (error) {
            alert(error.message);
        }
    };

    const fetchColoursBaseRGB = async (colour, size, rgb) => {
        try {
            const response = await fetch(
                "http://localhost:8080/palettes/create/rgb",
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        Color: colour,
                        size: size,
                        rgb: rgb,
                    }),
                }
            );
            if (!response.ok) {
                throw new Error(response.status + " error with request");
            }
            const data = await response.json();
            setColours(data);
        } catch (error) {
            alert(error.message);
        }
    };

    const savePalette = async (palette, name) => {
        try {
            const response = await fetch(
                "http://localhost:8080/palettes/save",
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
                        coloursHex: palette,
                        name: name,
                        createdBy: "",
                    }),
                }
            );
            if (!response.ok) {
                throw new Error(response.status + " error with request");
            }
        } catch (error) {
            alert(error.message);
        }
    };

    useEffect(() => {
        console.log("cols ", colours);
        setColourBlocks(createBlocks(colours));
        if (type == "homepage_1" || type == "homepage_2") {
            fetchColours(null, 20);
        }
    }, []);

    useEffect(() => {
        setColourBlocks([]);
        setColourBlocks(createBlocks(colours));
    }, [colours]);

    const createBlocks = (coloursArr) => {
        const animString = (i) => `blob 0.6s ease ${i}s forwards`;
        let blocks = [];
        for (let i = 0; i < coloursArr?.length; i++) {
            blocks[i] = (
                <ColourBlock
                    key={coloursArr[i]}
                    colour={coloursArr[i]}
                    animation={animString((i + 1) * 0.05)}
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
                        placeholder="Palette name..."
                        type="text"
                        onBlur={(e) => {
                            setPaletteName(e.target.value);
                        }}
                    />
                    <div className="generator-buttons">
                        <Button
                            onClick={() => {
                                fetchColours(null, paletteSize);
                            }}
                            value="Generate Palette"
                        />
                        <Button
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
                            onClick={() => {
                                sortColdToWarm(colours);
                            }}
                            value="Sort cold to warm"
                        />
                        <Button
                            onClick={() => {
                                fetchColoursBaseRGB(null, paletteSize, "r");
                            }}
                            value="I'm feeling red..."
                        />
                        <Button
                            onClick={() => {
                                fetchColoursBaseRGB(null, paletteSize, "g");
                            }}
                            value="I'm feeling green..."
                        />
                        <Button
                            onClick={() => {
                                fetchColoursBaseRGB(null, paletteSize, "b");
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
