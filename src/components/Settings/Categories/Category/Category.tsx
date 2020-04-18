import React, {useState} from "react";
import Confirm from "../../../Confirm/Confirm";
import './category.scss'
import clear from "../../../../assets/images/clear-dark.svg";

interface Props {
    name: string,
    id: any,

    setCategories(): void,

    deleteCategory(id: string): void,
}

const Category: React.FC<Props> = (props) => {
    const [showConfirm, setShowConfirm] = useState(false);

    const onDeleteCategory = () => {
        props.deleteCategory(props.id);
        props.setCategories();
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
                <Confirm title={'Are you sure?'} func={onDeleteCategory} close={onCloseConfirmWindow}/> : null}
            <div key={props.name} className={'category'}>
                <p>{props.name}</p>
                <button className={'button'} onClick={onButtonClick}>
                    <img src={clear} alt=""/>
                </button>
                {/*<Button image={del} func={onButtonClick} className={'button button--delete'} title={'Delete'}/>*/}
                {/*<button onClick={onButtonClick}>Delete</button>*/}
            </div>
        </>
    )
};

export default Category;