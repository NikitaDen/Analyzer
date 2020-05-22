import React from "react";
import './category.scss'
import clear from "../../../../assets/images/clear-dark.svg";

interface Props {
    name: string,
    id: number,

    onShowConfirmWindow(): void,

    setCategoryId(id: number): any,
}

const Category: React.FC<Props> = (props) => {

    return (
        <>
            <div key={props.name} className={'category'}>
                <p>{props.name}</p>
                <button className={'button'} onClick={() => {
                    props.onShowConfirmWindow();
                    props.setCategoryId(props.id);
                }}>
                    <img src={clear} alt=""/>
                </button>
            </div>
        </>
    )
};

export default Category;