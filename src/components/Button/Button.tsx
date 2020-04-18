import React from "react";

interface Props {
    image: any,
    func(val?: any): any,
    className: string,
    title: string,
    disabled?: boolean,
}

const Button: React.FC<Props> = (props) => {
    return (
            <button disabled={props.disabled} className={props.className} onClick={props.func}>
                <img src={props.image} alt=""/>
                <p>{props.title}</p>
            </button>
    )
};

export default Button;