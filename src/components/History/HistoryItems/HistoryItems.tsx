import React, {useCallback, useEffect} from "react";
import Expense from "./../Expense/Expense";
import '../history.scss';
import TableHeader from "../TableHeader/TableHeader";
import empty from './../../../assets/images/empty.svg';
import noData from './../../../assets/images/nodata.svg';
import Loader from "../../Loader/Loader";
import EmptyInfo from "../../EmptyInfo/EmptyInfo";

interface Expense {
    id: number
    name: string
    category: string
    count: number
    price: number
    spent: number
    date: string
}

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
    isLoading: boolean,
    checkedAll: boolean,

    setChosenItems(val?: any): any
    setCheckedAll(val?: any): any
    deleteExpense(id: any): void,
    changeExpenseThunkCreator(id: number, name: string, category: any, spent: any, count: any, price: any): any
    setExpenses(): void,
}

const HistoryItems: React.FC<Props> = (props) => {

    useEffect(() => {
        if (props.checkedAll && props.filterInRange) {
            props.setChosenItems(sortedExpenses.filter(item => item.props.id < props.dateHigher && item.props.id > props.dateLower).length ? sortedExpenses.filter(item => item.props.id < props.dateHigher && item.props.id > props.dateLower).map(item => item.props.id) : null);
        } else if (props.checkedAll && !props.filterInRange) {
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
    }, [props.checkedAll, props.filterInRange]);

    //Compare Functions
    const compareNames = (a: any, b: any) => {
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
        }
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
        }
        return 0;
    };
    const compareCategory = (a: any, b: any) => {
        if (a.category.toLowerCase() > b.category.toLowerCase()) {
            return 1;
        }
        if (a.category.toLowerCase() < b.category.toLowerCase()) {
            return -1;
        }
        return 0;
    };

    //Sort Function
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

    //Sorted Expenses with defineSort function
    const expenses = [...props.expenses].sort(defineSort());

    //Expense Component
    const expense = (item: Expense) => {
        return (
            <Expense id={item.id}
                     key={item.id}
                     categories={props.categories}
                     name={item.name}
                     category={item.category}
                     chosenItems={props.chosenItems}
                     setChosenItems={props.setChosenItems}
                     checkedAll={props.checkedAll}
                     count={item.count}
                     price={item.price}
                     spent={item.spent}
                     date={item.date}
                     deleteExpense={props.deleteExpense}
                     changeExpenseThunkCreator={props.changeExpenseThunkCreator}
            />
        )
    };


    //Define sorted expenses
    const sortedExpenses = (props.expenses.length && props.filter !== 'noFilter' && props.descending === 'Descending')
        ? expenses.filter((item: any) => item.category === props.filter).map((item: any) => expense(item))
        : (props.expenses.length && props.filter !== 'noFilter' && props.descending !== 'Descending')
            ? expenses.sort(defineSort()).filter((item: any) => item.category === props.filter).map((item: any) => expense(item)).reverse()
            : (props.descending === 'Descending')
                ? expenses.map((item: any) => expense(item))
                : expenses.map((item: any) => expense(item)).reverse();

    const chooseAllItems = useCallback(() => {
        props.setCheckedAll(!props.checkedAll);
    }, [props.checkedAll]);

    return (
        <div className={'table'}>
            <TableHeader checkedAll={props.checkedAll} chooseAllItems={chooseAllItems}/>

            {props.isLoading && <Loader/>}

            {props.filterInRange ? sortedExpenses.filter(item => item.props.id < props.dateHigher && item.props.id > props.dateLower).length
                ? sortedExpenses.filter(item => item.props.id < props.dateHigher && item.props.id > props.dateLower) :
                <EmptyInfo title={'You don\'t have any data for this period'} src={noData}/> : sortedExpenses}

            {props.expenses.length === 0 && !props.filterInRange && <EmptyInfo title={'Add your first expense'} src={empty}/>}
        </div>
    )
};


export default HistoryItems;