import React, {useCallback, useEffect, useState} from "react";
import {connect} from "react-redux";
import {
    changeExpenseThunkCreator,
    deleteExpensesThunkCreator, getExpenses,
    getExpensesThunkCreator,
} from "../../redux/history-reducer";
import Form from "./Form/Form";
import Filter from "./Filter/Filter";
import HistoryItems from "./HistoryItems/HistoryItems";
import add from './../../assets/images/add.svg';
import Button from "../Button/Button";
import del from './../../assets/images/delete.svg';
import Confirm from "../Confirm/Confirm";
import {getUser} from "../../redux/account-reducer";
import {Redirect} from "react-router-dom";
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
    const sortValues = ['By Date', 'By Spent', 'By Categories', 'By Name', 'By Count'];

    useEffect(() => {
        props.getExpensesThunkCreator();
        props.getUser();
    }, []);

    useEffect(() => {
        props.getExpensesThunkCreator(currentPage);
    }, [currentPage, deleteFlag]);

    // useEffect(() => {
    //     props.getExpensesThunkCreator(currentPage);
    // }, [deleteFlag]);

    // useEffect(() => {
    //     props.getExpensesThunkCreator(currentPage);
    // }, [deleteFlag]);

    const onChangeDateLower = (date: any) => {
        setDateLower(date);
    };

    const onChangeDateHigher = (date: any) => {
        setDateHigher(date);
    };

    // const onDeleteExpense = useCallback(() => {
    //     props.deleteExpensesThunkCreator(chosenItems);
    //     // props.getExpensesThunkCreator(currentPage);
    //     setDeleteFlag(!deleteFlag);
    //     setChosenItems([]);
    //     setShowConfirm(false);
    // }, [chosenItems]);

    const onDeleteExpense = () => {
        props.deleteExpensesThunkCreator(chosenItems);
        props.getExpensesThunkCreator(currentPage);
        setDeleteFlag(!deleteFlag);
        setChosenItems([]);
        setShowConfirm(false);
    };

    const onShowConfirm = () => {
        if (chosenItems.length) {
            setShowConfirm(true)
        }
    };

    let pages = [];

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
            <h2>Your history</h2>

            {showConfirm ? <Confirm className={'confirm show'}
                                    title={`Do you want delete ${chosenItems === null ? 0 : chosenItems.length} items?`}
                                    func={onDeleteExpense} close={() => setShowConfirm(false)}/> :
                <Confirm className={'confirm'}
                         title={`Do you want delete ${chosenItems === null ? 0 : chosenItems.length} items?`}
                         func={onDeleteExpense} close={() => setShowConfirm(false)}/>}

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

            <Form showForm={showForm}/>

            <HistoryItems isLoading={props.isLoading} changeExpenseThunkCreator={props.changeExpenseThunkCreator}
                          chosenItems={chosenItems} setChosenItems={setChosenItems} categories={props.categories}
                          filter={filter} sort={sort} descending={descending} expenses={props.expenses}
                          deleteExpense={props.deleteExpense} setExpenses={props.setExpenses}
                          dateLower={dateLower} dateHigher={dateHigher} filterInRange={filterInRange}/>
            {props.pages > 1 ? <div className={'buttons'}>
                <Button image={start} className={'button button--pages'} func={() => setCurrentPage(1)}/>
                <Button image={prev} className={'button button--pages'} func={() => currentPage !== 1 ? setCurrentPage(currentPage - 1) : null}/>

                <div className={'pages'}>{pages.map((item: any) => <button className={'button'} key={item || 0} style={item === currentPage ? {fontWeight: 'bold'} : {}}
                                                       onClick={() => {
                                                           props.getExpensesThunkCreator(item);
                                                           setCurrentPage(item || 0);
                                                       }}>{item}</button>)}</div>

                <Button image={next} className={'button button--pages'} func={() => currentPage !== props.pages ? setCurrentPage(currentPage + 1) : null}/>
                <Button image={end} className={'button button--pages'} func={() => setCurrentPage(props.pages)}/>
            </div> : null}

        </div>
    )
};

let mapStateToProps = (store: any) => ({
    expenses: store.history.expenses,
    pages: store.history.pages,
    categories: store.settings.categories,
    isAuth: store.account.isAuth,
    isLoading: store.account.isLoading,
});

export default connect(mapStateToProps, {
    getUser, getExpensesThunkCreator, getExpenses,
    deleteExpensesThunkCreator, changeExpenseThunkCreator
})(History);