import React from "react";

interface Props {
    image: string,
    className: string,
    title?: string,
    disabled?: boolean,
    func(val?: any): void,
}

const Button: React.FC<Props> = (props) => {
    return (
        <button disabled={props.disabled} className={props.className} onClick={props.func}>
            <img src={props.image} alt=""/>
            {props.title ? <p>{props.title}</p> : null}
        </button>
    )
};

export default Button;