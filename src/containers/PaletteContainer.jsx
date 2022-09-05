import { useState } from "react";
import { useEffect } from "react";
import Button from "../components/Button/Button";
import ColourBlock from "../components/ColourBlock/ColourBlock";

import "./paletteContainer.scss";

const PaletteContainer = () => {
    const [colours, setColours] = useState([]);
    const [colourBlocks, setColourBlocks] = useState([]);

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
            setColours(data.sort());
        } catch (error) {
            alert(error.message);
        }
    };

    const savePalette = async (palette) => {
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
                        createdBy: "bing bong",
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
        setColourBlocks([]);
        setColourBlocks(createBlocks(colours));
    }, [colours]);

    const animString = (i) => `blob 0.6s ease ${i}s forwards`;

    const createBlocks = (coloursArr) => {
        let blocks = [];
        for (let i = 0; i < coloursArr.length; i++) {
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

    return (
        <>
            <div className="palette-container">
                {colourBlocks}
                <p style={{ color: colours[0] }}>{colours}</p>
            </div>
            <Button
                onClick={() => {
                    fetchColours(null, 500);
                }}
                value="Generate Palette"
            />
            <Button
                onClick={() => {
                    savePalette(colours);
                }}
                value="Save Palette"
            />
        </>
    );
};

export default PaletteContainer;
