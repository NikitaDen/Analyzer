import React, {useCallback, useEffect, useState} from "react";
import {connect} from "react-redux";
import {
    addExpense,
    changeExpense, changeExpenseThunkCreator,
    deleteExpense, deleteExpensesThunkCreator,
    getExpenses,
    getExpensesThunkCreator,
    setExpenses
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
import Loader from "../Loader/Loader";

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
    const sortValues = ['By Date', 'By Spent', 'By Categories', 'By Name', 'By Count'];

    useEffect(() => {
        props.getUser();
    }, []);

    useEffect(() => {
        props.getExpensesThunkCreator();
    }, [chosenItems]);

    const onChangeDateLower = (date: any) => {
        setDateLower(date);
    };

    const onChangeDateHigher = (date: any) => {
        setDateHigher(date);
    };

    const onDeleteExpense = useCallback(() => {
        // props.deleteExpense(chosenItems);
        props.deleteExpensesThunkCreator(chosenItems);
        // props.setExpenses();
        setChosenItems([]);
        setShowConfirm(false);
    }, [chosenItems]);

    const onShowConfirm = () => {
        if (chosenItems.length) {
            setShowConfirm(true)
        }
    };

    if (!props.isAuth) {
        return <Redirect to={'login'}/>
    }

    return (
        <div className={'history'}>
            <h2>Your history</h2>

            {showConfirm ? <Confirm className={'confirm show'} title={`Do you want delete ${chosenItems.length} items?`}
                                    func={onDeleteExpense} close={() => setShowConfirm(false)}/> :
                <Confirm className={'confirm'} title={`Do you want delete ${chosenItems.length} items?`}
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
                        title={`${chosenItems.length}`}/>
            </div>

            <Form showForm={showForm}/>

            <HistoryItems isLoading={props.isLoading} changeExpenseThunkCreator={props.changeExpenseThunkCreator} chosenItems={chosenItems}
                          setChosenItems={setChosenItems} categories={props.categories}
                          filter={filter} sort={sort} descending={descending} expenses={props.expenses}
                          deleteExpense={props.deleteExpense} changeExpense={props.changeExpense}
                          setExpenses={props.setExpenses} dateLower={dateLower} dateHigher={dateHigher}
                          filterInRange={filterInRange}/>
        </div>
    )
};

let mapStateToProps = (store: any) => ({
    expenses: store.history.expenses,
    categories: store.settings.categories,
    isAuth: store.account.isAuth,
    isLoading: store.account.isLoading,
});

export default connect(mapStateToProps, {
    addExpense, setExpenses, getExpenses, getUser, changeExpense, deleteExpense, getExpensesThunkCreator,
    deleteExpensesThunkCreator, changeExpenseThunkCreator
})(History);