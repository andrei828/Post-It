import React from 'react'
import "./button.css"

const STYLES = [
    "my--btn--primary--solid",
    "my--btn--style",
    "not--found"
];

const SIZES = ["my--btn--large", "my--btn--medium"];

export const Button = ({
    children,
    type,
    onClick,
    buttonStyle,
    buttonSize
}) => {

    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0]
    const checkButtonSize = STYLES.includes(buttonSize) ? buttonSize : SIZES[0]

    return (
        <button className={`my--btn ${checkButtonStyle} ${checkButtonSize}`} onClick={onClick} type={type}>
            {children}
        </button>
    );
};