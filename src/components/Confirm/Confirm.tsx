import React from "react";
import './confirm.scss';

interface Props {
    title: string,
    className: string,
    func(): void,
    close(): any,
}

const Confirm: React.FC<Props> = (props) => {
    return (
        <div className={props.className}>
            <p>{props.title}</p>
            <button className={'button button--confirm'} onClick={props.func}>Yes</button>
            <button className={'button button--reject'} onClick={props.close}>No</button>
        </div>
    )
};

export default Confirm;