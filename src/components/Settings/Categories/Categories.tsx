import React, {useEffect, useState} from "react";
import Category from "./Category/Category";
import addDark from "../../../assets/images/add-dark.svg";
import './categories.scss';
import Confirm from "../../Confirm/Confirm";

interface Props {
    categories: any,
    isAuth: boolean,

    getCategoriesThunkCreator(): void,

    addCategoriesThunkCreator(name: string, id: any): void,

    deleteCategoryThunkCreator(id: string): void,
}

const Categories: React.FC<Props> = (props) => {
    const [newCategory, setNewCategory] = useState('');
    const [error, setError] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [categoryId, setCategoryId] = useState('');


    useEffect(() => {
        props.getCategoriesThunkCreator();
    }, [props.isAuth]);

    useEffect(() => {
        props.getCategoriesThunkCreator();
    }, []);

    const onKeyAdd = (e: any) => {
        if (e.key === 'Enter' && newCategory && newCategory.replace(/\s+/g, '')) {
            props.addCategoriesThunkCreator(newCategory, Date.now());
            setNewCategory('');
        } else {
            setError(true);
        }
    };

    const onAddCategory = () => {
        if (!newCategory || !newCategory.replace(/\s+/g, '')) {
            setError(true);
        } else {
            props.addCategoriesThunkCreator(newCategory, Date.now());
            setNewCategory('');
        }
    };

    const onCategoryTyping = (e: any) => {
        setNewCategory(e.currentTarget.value);
        if (error) {
            setError(false);
        }
    };

    const onDeleteCategory = (id: string) => {
        props.deleteCategoryThunkCreator(id);
    };

    const onCloseConfirmWindow = () => {
        setShowConfirm(false);
    };
    const onShowConfirmWindow = () => {
        setShowConfirm(true)
    };

    return (
        <div className={'settings__item categories'}>
            <h3>Categories</h3>
            <div className={'categories__form'}>
                <input onKeyPress={onKeyAdd} placeholder={'Products, Bills, etc.'} autoFocus={true} className={error ? 'category-name category-name--error' : 'category-name'} type="text"
                       value={newCategory} onBlur={() => setError(false)} onChange={onCategoryTyping}/>
                <button className={'button'} onClick={onAddCategory}>
                    <img src={addDark} alt=""/>
                </button>
            </div>

            <Confirm className={showConfirm ? 'confirm show' : 'confirm'} title={'Are you sure?'}
                     func={() => onDeleteCategory(categoryId)}
                     close={onCloseConfirmWindow}/>
            <div className={'categories__items'}>
                {props.categories.map((item: any) => <Category key={item.id} name={item.name} id={item.id}
                                                               deleteCategoryThunkCreator={props.deleteCategoryThunkCreator}
                                                               setCategoryId={setCategoryId} setShowConfirm={setShowConfirm}
                                                               showConfirm={showConfirm} onCloseConfirmWindow={onCloseConfirmWindow}
                                                               onDeleteCategory={onDeleteCategory} onShowConfirmWindow={onShowConfirmWindow}/>)}
            </div>
        </div>
    )
};

export default Categories;