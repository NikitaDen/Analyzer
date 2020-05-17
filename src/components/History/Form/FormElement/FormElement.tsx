import React from "react";

interface Props {
    title: string
    children: any
}

const FormElement: React.FC<Props> = (props) => {
    return (
        <div className={'form__element'}>
            <label htmlFor="name">{props.title}</label>
            {props.children}
        </div>
    )
};

export default React.memo(FormElement);