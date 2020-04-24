import React, {useEffect} from "react";
import {connect} from "react-redux";
import {
    addCategoriesThunkCreator,
    addCategory,
    deleteCategory, deleteCategoryThunkCreator,
    getCategories,
    getCategoriesThunkCreator,
    setCategories
} from "../../redux/settings-reducer";
import Categories from "./Categories/Categories";
import {getUser} from "../../redux/account-reducer";
import {Redirect} from "react-router-dom";


interface Props {
    categories: any,
    isAuth: boolean,

    addCategory(name: string): void,
    addCategoriesThunkCreator(name: string, id: any): void,

    getCategories(): void,
    getCategoriesThunkCreator(): void,

    getUser(): void,

    setCategories(): void,

    deleteCategory(id: string): void,
    deleteCategoryThunkCreator(id: string): void,
}

const Settings: React.FC<Props> = (props) => {
    useEffect(() => {
        props.getUser();
    }, []);

    if (!props.isAuth) {
        return <Redirect to={'login'}/>
    }

    return (
        <div className={'settings'}>
            <h2>Settings</h2>
            <Categories deleteCategoryThunkCreator={props.deleteCategoryThunkCreator} addCategoriesThunkCreator={props.addCategoriesThunkCreator} getCategoriesThunkCreator={props.getCategoriesThunkCreator} categories={props.categories}
                        getCategories={props.getCategories} addCategory={props.addCategory}
                        deleteCategory={props.deleteCategory}/>
        </div>
    )
};

const mapStateToProps = (store: any) => ({
    categories: store.settings.categories,
    isAuth: store.account.isAuth,
});

// @ts-ignore
export default connect(mapStateToProps, {addCategory, addCategoriesThunkCreator, getCategories, setCategories, deleteCategory, deleteCategoryThunkCreator, getUser, getCategoriesThunkCreator})(Settings);