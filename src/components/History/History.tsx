import React, {useState} from "react";
import {connect} from "react-redux";
import {addExpense, changeExpense, deleteExpense, getExpenses, setExpenses} from "../../redux/history-reducer";
import Form from "./Form/Form";
import Filter from "./Filter/Filter";
import HistoryItems from "./HistoryItems/HistoryItems";
import add from './../../assets/images/add.svg';
import Button from "../Button/Button";
import del from './../../assets/images/delete.svg';
import Confirm from "../Confirm/Confirm";

const History: React.FC = (props: any) => {
    const [filter, setFilter] = useState('noFilter');
    const [sort, setSort] = useState('By Date');
    const sortValues = ['By Date', 'By Spent', 'By Categories', 'By Name', 'By Count'];
    const [descending, setDescending] = useState('Descending');
    const [dateLower, setDateLower] = useState(new Date().setHours(0));
    const [dateHigher, setDateHigher] = useState(new Date().setDate(new Date().getDate() + 1));
    const [filterInRange, setFilterInRange] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [chosenItems, setChosenItems] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false);

    const onChangeDateLower = (date: any) => {
        setDateLower(date);
    };

    const onChangeDateHigher = (date: any) => {
        setDateHigher(date);
    };

    const onDeleteExpense = () => {
        props.deleteExpense(chosenItems);
        props.setExpenses();
        setChosenItems([]);
        setShowConfirm(false);
    };

    const onShowConfirm = () => {
        if (chosenItems.length) {
            setShowConfirm(true)
        }
    };

    return (
        <div className={'history'}>
            <h2>Your history</h2>

            {showConfirm ? <Confirm title={`Do you want delete ${chosenItems.length} items?`} func={onDeleteExpense} close={() => setShowConfirm(false)}/> : null}

            <div className={'history__buttons'}>
                <Button image={add} func={() => setShowForm(!showForm)} className={'button button--add'}
                        title={'Add new'}/>
                <Button image={del} func={onShowConfirm} className={'button button--delete'} title={`Delete items (${chosenItems.length})`}/>
            </div>

            <Form showForm={showForm}/>
            <Filter categories={props.categories} descending={descending} setDescending={setDescending} filter={filter}
                    setFilter={setFilter} sort={sort} setSort={setSort} sortValues={sortValues} dateLower={dateLower}
                    dateHigher={dateHigher} onChangeDateLower={onChangeDateLower}
                    onChangeDateHigher={onChangeDateHigher} filterInRange={filterInRange}
                    setFilterInRange={setFilterInRange}/>

            <HistoryItems chosenItems={chosenItems} setChosenItems={setChosenItems} categories={props.categories}
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
});

export default connect(mapStateToProps, {addExpense, setExpenses, getExpenses, changeExpense, deleteExpense})(History);