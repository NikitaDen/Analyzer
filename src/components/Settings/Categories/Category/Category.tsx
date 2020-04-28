import React, {useState} from "react";
import Confirm from "../../../Confirm/Confirm";
import './category.scss'
import clear from "../../../../assets/images/clear-dark.svg";

interface Props {
    name: string,
    id: any,
    
    deleteCategoryThunkCreator(id: string): void,
}

const Category: React.FC<Props> = (props) => {
    const [showConfirm, setShowConfirm] = useState(false);

    const onDeleteCategory = () => {
        props.deleteCategoryThunkCreator(props.id);
    };

    const onCloseConfirmWindow = () => {
        setShowConfirm(false);
    };
    const onButtonClick = () => {
        setShowConfirm(true)
    };

    return (
        <>
            {showConfirm ?
                <Confirm className={'confirm show'} title={'Are you sure?'} func={onDeleteCategory}
                         close={onCloseConfirmWindow}/> :
                <Confirm className={'confirm'} title={'Are you sure?'} func={onDeleteCategory}
                         close={onCloseConfirmWindow}/>}
            <div key={props.name} className={'category'}>
                <p>{props.name}</p>
                <button className={'button'} onClick={onButtonClick}>
                    <img src={clear} alt=""/>
                </button>
            </div>
        </>
    )
};

export default Category;