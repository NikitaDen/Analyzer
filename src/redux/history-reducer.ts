import {showLoading} from "./account-reducer";
import {baseURL, historyAPI, refreshToken} from "../api/api";
import axios from "axios";
import {actionCreator} from "./interfaces";

const ADD_EXPENSE = 'ADD_EXPENSE';
const DELETE_EXPENSE = 'DELETE_EXPENSE';
const GET_EXPENSES = 'GET_EXPENSES';
const GET_PAGES = 'GET_PAGES';
const CHANGE_EXPENSE = 'CHANGE_EXPENSE';

let initialState: any = {
    expenses: [],
    pages: 1,
    limit: 10,
};

interface Expense {
    id: number,
    category: string,
    count: number,
    name: string,
    price: number,
    spent: number,
}

const historyReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case ADD_EXPENSE:
            return {
                ...state,
                expenses: [
                    ...state.expenses,
                    {
                        ...action.expense,
                        date: `${new Date().toLocaleString()}`,
                    },
                ]
            };
        case DELETE_EXPENSE:
            return {
                ...state,
                expenses: [
                    ...state.expenses.filter((item: any) => !action.id.includes(item.id))
                ]
            };
        case GET_EXPENSES: {
            return {
                ...state,
                expenses: [...action.expenses]
            };
        }
        case GET_PAGES: {
            return {
                ...state,
                pages: Math.ceil(action.pages / state.limit),
            };
        }
        case CHANGE_EXPENSE: {
            return {
                ...state,
                expenses: [
                    ...state.expenses.map((item: any) => {
                        if (item.id === action.id) {
                            return {
                                ...item,
                                name: action.name,
                                category: action.category,
                                count: action.count,
                                spent: action.spent,
                                price: action.price,
                            }
                        }
                        return item
                    })
                ]
            };
        }
        default:
            return state;
    }
};

export const addExpense = (expense: Expense): actionCreator => ({type: ADD_EXPENSE, expense});
export const addExpenseThunkCreator = (expense: any) => async (dispatch: any) => {
    dispatch(showLoading(true));

    try {
        dispatch(addExpense(expense));

        await historyAPI.addExpense(expense);

        dispatch(showLoading(false));
    } catch (e) {
        await refreshToken('/history/expenses', {
            name: expense.name,
            category: expense.category,
            count: expense.count,
            spent: expense.spent,
            price: expense.price,
            date: `${new Date().toLocaleString()}`,
            id: expense.id,
        }, axios.post, dispatch);
    }
};

export const deleteExpense = (id: any): actionCreator => ({type: DELETE_EXPENSE, id});
export const deleteExpensesThunkCreator = (id: any) => async (dispatch: any) => {
    dispatch(showLoading(true));

    try {
        await historyAPI.deleteExpense(id);
        dispatch(deleteExpense(id));
        dispatch(showLoading(false));
    } catch (e) {
        await refreshToken('/history/delete', {id}, axios.put, dispatch, deleteExpense);
    }
};


export const getExpenses = (expenses: any): actionCreator => ({type: GET_EXPENSES, expenses});
export const getPages = (pages: any): actionCreator => ({type: GET_PAGES, pages});

export const getExpensesThunkCreator = (page: number = 1) => async (dispatch: any) => {
    dispatch(showLoading(true));

    try {
        const response = await axios.get(`${baseURL}/history/expenses?page=${page}&limit=10`, {
            headers: {
                'token': `${localStorage.getItem('token')}`
            }
        });
        dispatch(showLoading(false));
        dispatch(getExpenses(response.data.expenses));
        dispatch(getPages(response.data.length));
    } catch (e) {
        await refreshToken(`/history/expenses?page=${page}&limit=10`, null, axios.get, dispatch, getExpenses);
    }
};

export const getAllExpensesThunkCreator = () => async (dispatch: any) => {
    dispatch(showLoading(true));

    try {
        const response = await axios.get(`${baseURL}/history/allexpenses`, {
            headers: {
                'token': `${localStorage.getItem('token')}`
            }
        });
        dispatch(showLoading(false));
        dispatch(getExpenses(response.data.expenses));
    } catch (e) {
        await refreshToken('/history/allexpenses', null, axios.get, dispatch, getExpenses);
    }
};

export const changeExpense = (id: number, name: string, category: string, spent: number, count: number, price: number): actionCreator => ({
    type: CHANGE_EXPENSE,
    id,
    name,
    category,
    spent,
    count,
    price
});
export const changeExpenseThunkCreator = (id: number, name: string, category: any, spent: number, count: number, price: number) => async (dispatch: any) => {
    dispatch(showLoading(true));

    try {
        dispatch(changeExpense(id, name, category, spent, count, price));

        await historyAPI.changeExpense(id, name, category, spent, count, price);

        dispatch(showLoading(false));
    } catch (e) {
        await refreshToken('/history/change', {id, name, category, spent, count, price}, axios.put, dispatch);
    }
};

export default historyReducer;