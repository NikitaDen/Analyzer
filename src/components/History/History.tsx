import React, {useCallback, useEffect, useState} from "react";
import {connect} from "react-redux";
import {
    addExpenseThunkCreator,
    changeExpenseThunkCreator,
    deleteExpensesThunkCreator, getExpenses,
    getExpensesThunkCreator,
} from "../../redux/history-reducer";
import Form from "./Form/Form";
import Filter from "./Filter/Filter";
import HistoryItems from "./HistoryItems/HistoryItems";
import Button from "../Button/Button";
import Confirm from "../Confirm/Confirm";
import {getUser} from "../../redux/account-reducer";
import {Redirect} from "react-router-dom";
import {expensesSelector, pagesSelector} from "../../selectors/history-selectors";
import {categoriesSelector} from "../../selectors/settings-selector";
import {isAuthSelector, isLoadingSelector} from "../../selectors/account-selectors";
import {getCategoriesThunkCreator} from "../../redux/settings-reducer";

import add from './../../assets/images/add.svg';
import del from './../../assets/images/delete.svg';
import prev from '../../assets/images/prev.svg';
import next from '../../assets/images/next.svg';
import end from '../../assets/images/end.svg';
import start from '../../assets/images/start.svg';

const History: React.FC = (props: any) => {
    const [filter, setFilter] = useState('noFilter');
    const [sort, setSort] = useState('By Date');
    const [descending, setDescending] = useState('Descending');
    const [dateLower, setDateLower] = useState(new Date().setHours(0));
    const [dateHigher, setDateHigher] = useState(new Date().setDate(new Date().getDate() + 1));
    const [filterInRange, setFilterInRange] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [chosenItems, setChosenItems] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [deleteFlag, setDeleteFlag] = useState(true);
    const [checkedAll, setCheckedAll] = useState(false);

    const sortValues = ['By Date', 'By Spent', 'By Categories', 'By Name', 'By Count'];

    useEffect(() => {
        props.getExpensesThunkCreator();
        props.getUser();
    }, []);

    useEffect(() => {
        props.getExpensesThunkCreator(currentPage);
    }, [currentPage, deleteFlag]);

    const onChangeCurrentPage = (item: number) => {
        props.getExpensesThunkCreator(item);
        setCurrentPage(item || 0);
    };

    const onChangeDateLower = (date: any) => {
        setDateLower(date);
    };

    const onChangeDateHigher = (date: any) => {
        setDateHigher(date);
    };

    const onDeleteExpense = useCallback(() => {
        props.deleteExpensesThunkCreator(chosenItems);
        props.getExpensesThunkCreator(currentPage);
        setCheckedAll(false);
        setDeleteFlag(!deleteFlag);
        setChosenItems([]);
        setShowConfirm(false);
    }, [chosenItems]);

    const onShowConfirm = () => {
        if (chosenItems.length) {
            setShowConfirm(true)
        }
    };

    let pages;

    if (currentPage === props.pages) {
        pages = props.pages > 2 ? [currentPage - 2, currentPage - 1, currentPage] : [currentPage - 1, currentPage];
    } else if (currentPage === 1) {
        pages = props.pages > 2 ? [currentPage, currentPage + 1, currentPage + 2] : [currentPage, currentPage + 1];
    } else {
        pages = [currentPage - 1, currentPage, currentPage + 1];
    }

    if (!props.isAuth) {
        return <Redirect to={'login'}/>
    }

    return (
        <div className={'history'}>
            <h2>History</h2>

            <Confirm className={showConfirm ? 'confirm show': 'confirm'}
                                    title={`Do you want delete ${chosenItems === null ? 0 : chosenItems.length} ${chosenItems.length === 1 ? 'item' : 'items'}?`}
                                    func={onDeleteExpense} close={() => setShowConfirm(false)}/>

            <Filter categories={props.categories} descending={descending} setDescending={setDescending} filter={filter}
                    setFilter={setFilter} sort={sort} setSort={setSort} sortValues={sortValues} dateLower={dateLower}
                    dateHigher={dateHigher} onChangeDateLower={onChangeDateLower}
                    onChangeDateHigher={onChangeDateHigher} filterInRange={filterInRange}
                    setFilterInRange={setFilterInRange}/>

            <div style={props.isLoading ? {opacity: ".5", pointerEvents: 'none'} : {}} className={'history__buttons'}>
                <Button image={add} func={() => setShowForm(!showForm)} className={'button button--add'}
                        title={''}/>
                <Button image={del} func={onShowConfirm} className={'button button--delete'}
                        title={`${chosenItems === null ? 0 : chosenItems.length}`}/>
            </div>

            <Form currentPage={currentPage} categories={props.categories} getExpensesThunkCreator={() => props.getExpensesThunkCreator(currentPage)} showForm={showForm} addExpenseThunkCreator={props.addExpenseThunkCreator}
                  getCategoriesThunkCreator={props.getCategoriesThunkCreator}/>

            <HistoryItems getExpensesThunkCreator={() => props.getExpensesThunkCreator(currentPage)} checkedAll={checkedAll} setCheckedAll={setCheckedAll} isLoading={props.isLoading}
                          changeExpenseThunkCreator={props.changeExpenseThunkCreator}
                          chosenItems={chosenItems} setChosenItems={setChosenItems} categories={props.categories}
                          filter={filter} sort={sort} descending={descending} expenses={props.expenses}
                          deleteExpense={props.deleteExpense} setExpenses={props.setExpenses}
                          dateLower={dateLower} dateHigher={dateHigher} filterInRange={filterInRange}/>

            {props.pages > 1 && <div className={'buttons'}>
                <Button image={start} className={'button button--pages'} func={() => setCurrentPage(1)}/>
                <Button image={prev} className={'button button--pages'}
                        func={() => currentPage !== 1 && setCurrentPage(currentPage - 1)}/>

                <div className={'pages'}>
                    {pages.map((item: any) => <button className={'button'} key={item || 0}
                                                      style={item === currentPage ? {fontWeight: 'bold'} : {}}
                                                      onClick={() => onChangeCurrentPage(item)}>{item}</button>)}
                </div>

                <Button image={next} className={'button button--pages'}
                        func={() => currentPage !== props.pages && setCurrentPage(currentPage + 1)}/>
                <Button image={end} className={'button button--pages'} func={() => setCurrentPage(props.pages)}/>
            </div>}

        </div>
    )
};

let mapStateToProps = (store: any) => ({
    expenses: expensesSelector(store),
    pages: pagesSelector(store),
    categories: categoriesSelector(store),
    isAuth: isAuthSelector(store),
    isLoading: isLoadingSelector(store),
});

export default connect(mapStateToProps, {
    getUser, getExpensesThunkCreator, getExpenses, addExpenseThunkCreator,
    deleteExpensesThunkCreator, changeExpenseThunkCreator, getCategoriesThunkCreator
})(History);