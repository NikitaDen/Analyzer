import React, {useCallback, useEffect, useState} from "react";
import Expense from "./../Expense/Expense";
import './history.scss';
import TableHeader from "../TableHeader/TableHeader";
import empty from './../../../assets/images/empty.svg';
import noData from './../../../assets/images/nodata.svg';

interface Props {
    filter: any,
    sort: string,
    descending: string,
    expenses: any,
    categories: any,
    dateLower: any,
    dateHigher: any,
    filterInRange: boolean,
    chosenItems: any,

    setChosenItems(val?: any): any

    changeExpense(): void,

    deleteExpense(id: any): void,
    changeExpenseThunkCreator(id: number, name: string, category: any, spent: any, count: any, price: any): any
    setExpenses(): void,
}

const HistoryItems: React.FC<Props> = (props) => {
    const [checkedAll, setCheckedAll] = useState(false);

    useEffect(() => {
        if (checkedAll && props.filterInRange) {
            props.setChosenItems(items.filter(item => item.props.id < props.dateHigher && item.props.id > props.dateLower).length ? items.filter(item => item.props.id < props.dateHigher && item.props.id > props.dateLower).map(item => item.props.id) : null);
        } else if (checkedAll && !props.filterInRange) {
            if (props.expenses.length && props.filter !== 'noFilter' && props.descending === 'Descending') {
                props.setChosenItems([...expenses.filter((item: any) => item.category === props.filter).map((item: any) => item.id)]);
            } else if (props.expenses.length && props.filter !== 'noFilter' && props.descending !== 'Descending') {
                props.setChosenItems([...expenses.sort(defineSort()).filter((item: any) => item.category === props.filter).map((item: any) => item.id).reverse()]);
            } else if (props.descending === 'Descending') {
                props.setChosenItems([...expenses.map((item: any) => item.id)]);
            } else {
                props.setChosenItems([...expenses.map((item: any) => item.id).reverse()]);
            }
        } else {
            props.setChosenItems([]);
        }
    }, [checkedAll, props.filterInRange]);

    const compareNames = (a: any, b: any) => {
        if (a.name > b.name) {
            return 1;
        }
        if (a.name < b.name) {
            return -1;
        }
        return 0;
    };
    const compareCategory = (a: any, b: any) => {
        if (a.category > b.category) {
            return 1;
        }
        if (a.category < b.category) {
            return -1;
        }
        return 0;
    };
    const defineSort = () => {
        switch (props.sort) {
            case 'By Date':
                return (a: any, b: any) => b.id - a.id;
            case 'By Spent':
                return (a: any, b: any) => b.spent - a.spent;
            case 'By Categories':
                return compareCategory;
            case 'By Name':
                return compareNames;
            case 'By Count':
                return (a: any, b: any) => b.count - a.count;
            default:
                return (a: any, b: any) => b.id - a.id;
        }
    };

    const expenses = [...props.expenses].sort(defineSort());
    const expense = (item: any) => {
        return (
            <Expense id={item.id}
                     key={item.id}
                     categories={props.categories}
                     name={item.name}
                     category={item.category}
                     chosenItems={props.chosenItems}
                     setChosenItems={props.setChosenItems}
                     checkedAll={checkedAll}
                     count={item.count}
                     price={item.price}
                     spent={item.spent}
                     date={item.date}
                     changeExpense={props.changeExpense}
                     deleteExpense={props.deleteExpense}
                     setExpenses={props.setExpenses}
                     changeExpenseThunkCreator={props.changeExpenseThunkCreator}
            />
        )
    };

    const items = (props.expenses.length && props.filter !== 'noFilter' && props.descending === 'Descending')
        ? expenses.filter((item: any) => item.category === props.filter).map((item: any) => expense(item))
        : (props.expenses.length && props.filter !== 'noFilter' && props.descending !== 'Descending')
            ? expenses.sort(defineSort()).filter((item: any) => item.category === props.filter).map((item: any) => expense(item)).reverse()
            : (props.descending === 'Descending')
                ? expenses.map((item: any) => expense(item))
                : expenses.map((item: any) => expense(item)).reverse();

    const chooseAllItems = useCallback(() => {
        setCheckedAll(!checkedAll);
    }, [checkedAll]);

    return (
        <div className={'table'}>
            <TableHeader checkedAll={checkedAll} chooseAllItems={chooseAllItems}/>

            {props.filterInRange ? items.filter(item => item.props.id < props.dateHigher && item.props.id > props.dateLower).length
                ? items.filter(item => item.props.id < props.dateHigher && item.props.id > props.dateLower) :
                <div className={'empty'}>
                    <p>You don't have any data for this period</p>
                    <img src={noData} alt=""/>
                </div> : items}
            {props.expenses.length === 0 && !props.filterInRange ? <div className={'empty'}>
                <p>Add your first expense</p>
                <img src={empty} alt=""/>
            </div> : null}
        </div>
    )
};


export default HistoryItems;