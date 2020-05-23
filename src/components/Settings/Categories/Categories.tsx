import React, {useEffect, useState} from "react";
import Category from "./Category/Category";
import addDark from "../../../assets/images/add-dark.svg";
import './categories.scss';
import Confirm from "../../Confirm/Confirm";
import {CategoryType} from "../../../redux/settings-reducer";

interface Props {
    categories: Array<CategoryType>,
    isAuth: boolean,

    getCategoriesThunkCreator(): void,

    addCategoriesThunkCreator(name: string, id: number): void,

    deleteCategoryThunkCreator(id: number): void,
}

const Categories: React.FC<Props> = (props) => {
    const [newCategory, setNewCategory] = useState('');
    const [error, setError] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [categoryId, setCategoryId] = useState(0);


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

    const onCategoryTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewCategory(e.currentTarget.value);
        if (error) {
            setError(false);
        }
    };

    const onDeleteCategory = (id: number) => {
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

            <Confirm className={showConfirm ? 'confirm show' : 'confirm'} title={'This category will be deleted. Are you sure?'}
                     func={() => onDeleteCategory(+categoryId)}
                     close={onCloseConfirmWindow}/>

            <div className={'categories__items'}>
                {props.categories.map((item: CategoryType) => <Category key={item.id} name={item.name} id={item.id}
                                                               setCategoryId={setCategoryId} onShowConfirmWindow={onShowConfirmWindow}/>)}
            </div>
        </div>
    )
};

export default Categories;