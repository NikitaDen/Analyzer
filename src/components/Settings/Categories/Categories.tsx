import React, {useEffect, useState} from "react";
import Category from "./Category/Category";
import addDark from "../../../assets/images/add-dark.svg";
import './categories.scss';

interface Props {
    categories: any,

    getCategories(): void,
    getCategoriesThunkCreator(): void,

    addCategory(category: string): void,
    addCategoriesThunkCreator(name: string, id: any): void,

    deleteCategory(id: string): void,
    deleteCategoryThunkCreator(id: string): void,
}

const Categories: React.FC<Props> = (props) => {
    const [newCategory, setNewCategory] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        // props.getCategories();
        props.getCategoriesThunkCreator();
    }, []);

    const onAddCategory = () => {
        if (!newCategory) {
            setError(true);
        } else {
            // props.addCategory(newCategory);
            props.addCategoriesThunkCreator(newCategory, Date.now());
            // props.setCategories();
            setNewCategory('');
        }
    };
    const onCategoryTyping = (e: any) => {
        setNewCategory(e.currentTarget.value);
        if (error) {
            setError(false);
        }
    };

    return (
        <div className={'settings__item categories'}>
            <h3>Categories</h3>
            <div className={'categories__form'}>
                <input className={error ? 'category-name category-name--error' : 'category-name'} type="text"
                       value={newCategory} onBlur={() => setError(false)} onChange={onCategoryTyping}/>
                <button className={'button'} onClick={onAddCategory}>
                    <img src={addDark} alt=""/>
                </button>
            </div>

            {props.categories.map((item: any) => <Category key={item.id} name={item.name} id={item.id}
                                                           deleteCategory={props.deleteCategory} deleteCategoryThunkCreator={props.deleteCategoryThunkCreator}/>)}
        </div>
    )
};

export default Categories;