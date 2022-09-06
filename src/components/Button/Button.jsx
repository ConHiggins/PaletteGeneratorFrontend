import "./Button.scss";

const Button = ({ value, onClick, classN }) => {
    const className = `button-${classN}`;
    return (
        <button className={className} onClick={onClick}>
            {value}
        </button>
    );
};

export default Button;
