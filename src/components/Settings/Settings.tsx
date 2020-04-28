import React, {useEffect} from "react";
import {connect} from "react-redux";
import {
    addCategoriesThunkCreator,
    deleteCategoryThunkCreator,
    getCategoriesThunkCreator,
} from "../../redux/settings-reducer";
import Categories from "./Categories/Categories";
import {getUser} from "../../redux/account-reducer";
import {Redirect} from "react-router-dom";
import Loader from "../Loader/Loader";
import {isAuthSelector, isLoadingSelector} from "../../selectors/account-selectors";
import {categoriesSelector} from "../../selectors/settings-selector";


interface Props {
    categories: any,
    isAuth: boolean,
    isLoading: boolean,

    addCategoriesThunkCreator(name: string, id: any): void,

    getCategoriesThunkCreator(): void,

    getUser(): void,

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
            {props.isLoading ? <Loader/> : <Categories isAuth={props.isAuth} deleteCategoryThunkCreator={props.deleteCategoryThunkCreator}
                                                       addCategoriesThunkCreator={props.addCategoriesThunkCreator}
                                                       getCategoriesThunkCreator={props.getCategoriesThunkCreator} categories={props.categories}/>}

        </div>
    )
};

const mapStateToProps = (store: any) => ({
    categories: categoriesSelector(store),
    isAuth: isAuthSelector(store),
    isLoading: isLoadingSelector(store),
});

export default connect(mapStateToProps, {
    addCategoriesThunkCreator,
    deleteCategoryThunkCreator,
    getUser, getCategoriesThunkCreator
})(Settings);