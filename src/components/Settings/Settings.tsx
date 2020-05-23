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
import {CategoryType} from "../../redux/settings-reducer";
import DataLoad from "./DataLoad/DataLoad";
import {deleteExpensesThunkCreator, getAllExpensesThunkCreator} from "../../redux/history-reducer";
import {expensesSelector} from "../../selectors/history-selectors";
import {Expenses} from "../Analytics/Analytics";
import './settings.scss';
import DataDelete from "./DeleteData/DataDelete";



interface Props {
    categories: Array<CategoryType>,
    isAuth: boolean,
    isLoading: boolean,
    expenses: Array<Expenses>,

    addCategoriesThunkCreator(name: string, id: number): void,

    getCategoriesThunkCreator(): void,

    getAllExpensesThunkCreator(): void,

    getUser(): void,

    deleteExpensesThunkCreator(id: Array<number>): void,

    deleteCategoryThunkCreator(id: number): void,
}

const Settings: React.FC<Props> = (props) => {
    useEffect(() => {
        props.getUser();
        props.getAllExpensesThunkCreator();
    }, []);

    if (!props.isAuth) {
        return <Redirect to={'login'}/>
    }

    if (props.isLoading) {
        return <Loader/>
    }

    return (
        <div className={'settings'}>
            <h2>Settings</h2>
            <Categories isAuth={props.isAuth} deleteCategoryThunkCreator={props.deleteCategoryThunkCreator}
                        addCategoriesThunkCreator={props.addCategoriesThunkCreator}
                        getCategoriesThunkCreator={props.getCategoriesThunkCreator} categories={props.categories}/>
            <DataLoad expenses={props.expenses} categories={props.categories}/>
            <DataDelete expenses={props.expenses} deleteExpensesThunkCreator={props.deleteExpensesThunkCreator}/>

        </div>
    )
};

const mapStateToProps = (store: any) => ({
    categories: categoriesSelector(store),
    isAuth: isAuthSelector(store),
    isLoading: isLoadingSelector(store),
    expenses: expensesSelector(store),
});

export default connect(mapStateToProps, {
    addCategoriesThunkCreator,
    deleteCategoryThunkCreator,
    getUser, getCategoriesThunkCreator, getAllExpensesThunkCreator, deleteExpensesThunkCreator
})(Settings);