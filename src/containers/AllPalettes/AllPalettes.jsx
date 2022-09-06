import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import PaletteContainer from "../PaletteContainer/PaletteContainer";
import "./AllPalettes.scss";

const AllPalettes = () => {
    const [palettesData, setPalettesData] = useState([]);

    const fetchAllPalettes = async () => {
        try {
            const response = await fetch("http://localhost:8080/palettes");

            if (!response.ok) {
                throw new Error(response.status + " error with request");
            }
            const data = await response.json();
            setPalettesData([...data]);
            console.log(palettesData);
        } catch (error) {
            alert(error.message);
        }
    };

    useEffect(() => {
        fetchAllPalettes();
    }, []);

    useEffect(() => {
        const tempPalettes = [];
        for (let i = 0; i < palettesData.length; i++) {
            tempPalettes[i] = palettesData[i].coloursHex;
        }
    }, [palettesData]);

    ///Have palettes data
    ///Map to array
    //don't use state you donut

    const paletteBlocks = palettesData.map((p) => (
        <PaletteContainer key={p.id} cols={p.coloursHex} type="loaded" />
    ));

    return (
        <div>
            <Navbar />
            <div className="all-palettes">
                <h1>All Palettes</h1>
                <div>{paletteBlocks}</div>
            </div>
        </div>
    );
};

export default AllPalettes;
