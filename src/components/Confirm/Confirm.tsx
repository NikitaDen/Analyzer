import React from "react";
import './confirm.scss';
import cancel from '../../assets/images/cancel.svg';
import confirm from '../../assets/images/confirm.svg';

interface Props {
    title: string,
    className: string,
    func(): any,
    close(): any,
}

const Confirm: React.FC<Props> = (props) => {
    return (
        <div className={props.className}>
            <p>{props.title}</p>
            <div className={'buttons'}>
                <div>
                    <button className={'button button--confirm'} onClick={props.func}>
                        <img src={confirm} alt=""/>
                    </button>
                    <p>Yes</p>
                </div>
                <div>
                    <button className={'button button--reject'} onClick={props.close}>
                        <img src={cancel} alt=""/>
                    </button>
                    <p>No</p>
                </div>
            </div>
        </div>
    )
};

export default Confirm;