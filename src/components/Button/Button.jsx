import "./Button.scss";

const Button = ({ value, onClick, classN, styling }) => {
    const className = `button-${classN}`;
    return (
        <button className={className} onClick={onClick} style={styling}>
            {value}
        </button>
    );
};

export default Button;
