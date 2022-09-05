import "./colourBlock.scss";

const ColourBlock = ({ colour, animation }) => {
    return (
        <div className="colour-block-container">
            <div
                className="colour-block"
                style={{ backgroundColor: colour, animation: animation }}
            >
                <p className="colour-block-properties">{colour}</p>
            </div>
        </div>
    );
};

export default ColourBlock;
