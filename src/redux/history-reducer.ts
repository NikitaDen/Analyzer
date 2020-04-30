import {showLoading, userLogin} from "./account-reducer";
import {baseURL, historyAPI} from "../api/api";
import * as axios from "axios";

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

export const addExpense = (expense: any) => ({type: ADD_EXPENSE, expense});
export const addExpenseThunkCreator = (expense: any) => async (dispatch: any) => {
    dispatch(showLoading(true));

    try {
        dispatch(addExpense(expense));

        await historyAPI.addExpense(expense);

        dispatch(showLoading(false));
    } catch (e) {
        const token = `${localStorage.getItem('refreshToken')}`;
        if (token) {
            // @ts-ignore
            const response = await axios.post(`${baseURL}/user/token`, {
                token: token
            });
            if (response.data) {
                localStorage.setItem('token', response.data);

                // @ts-ignore
                await axios.post(`${baseURL}/history/expenses`, {
                    name: expense.name,
                    category: expense.category,
                    count: expense.count,
                    spent: expense.spent,
                    price: expense.price,
                    date: `${new Date().toLocaleString()}`,
                    id: expense.id,
                }, {
                    headers: {
                        'token': response.data
                    }
                });

                dispatch(showLoading(false));
            }
        }
    }
};

export const deleteExpense = (id: any) => ({type: DELETE_EXPENSE, id});
export const deleteExpensesThunkCreator = (id: any) => async (dispatch: any) => {
    dispatch(showLoading(true));

    try {
        dispatch(deleteExpense(id));

        await historyAPI.deleteExpense(id);

        dispatch(showLoading(false));
    } catch (e) {
        const token = `${localStorage.getItem('refreshToken')}`;
        if (token) {
            // @ts-ignore
            const response = await axios.post(`${baseURL}/user/token`, {
                token: token
            });
            if (response.data) {
                localStorage.setItem('token', response.data);
                dispatch(userLogin(true));
                dispatch(deleteExpense(id));

                // @ts-ignore
                await axios.put(`${baseURL}/history/delete`, {id}, {
                    headers: {
                        'token': response.data
                    }
                });
                dispatch(showLoading(false));
            }
        }
    }
};


export const getExpenses = (expenses: any) => ({type: GET_EXPENSES, expenses});
export const getPages = (pages: any) => ({type: GET_PAGES, pages});

export const getExpensesThunkCreator = (page: number = 1) => async (dispatch: any) => {
    dispatch(showLoading(true));

    try {
        // `https://analyzerserver.herokuapp.com/api/history/expenses?page=${page}&limit=10`
        // @ts-ignore
        const response = await axios.get(`${baseURL}/history/expenses?page=${page}&limit=10`, {
            headers: {
                'token': `${localStorage.getItem('token')}`
            }
        });
        dispatch(showLoading(false));
        dispatch(getExpenses(response.data.expenses));
        dispatch(getPages(response.data.length));
    } catch (e) {
        const token = `${localStorage.getItem('refreshToken')}`;
        if (token) {
            // @ts-ignore
            const response = await axios.post(`${baseURL}/user/token`, {
                token: token
            });
            if (response.data) {
                localStorage.setItem('token', response.data);
                dispatch(userLogin(true));

                // @ts-ignore
                const expenses = await axios.get(`${baseURL}/history/expenses?page=${page}&limit=10`, {
                    headers: {
                        'token': response.data,
                    }
                });
                dispatch(showLoading(false));
                dispatch(getExpenses(expenses.data.expenses));
                dispatch(getPages(expenses.data.length));
            }
        }
    }
};

export const getAllExpensesThunkCreator = () => async (dispatch: any) => {
    dispatch(showLoading(true));

    try {
        // @ts-ignore
        const response = await axios.get(`${baseURL}/history/allexpenses`, {
            headers: {
                'token': `${localStorage.getItem('token')}`
            }
        });
        dispatch(showLoading(false));
        dispatch(getExpenses(response.data.expenses));
    } catch (e) {
        const token = `${localStorage.getItem('refreshToken')}`;
        if (token) {
            // @ts-ignore
            const response = await axios.post(`${baseURL}/user/token`, {
                token: token
            });
            if (response.data) {
                localStorage.setItem('token', response.data);
                dispatch(userLogin(true));

                // @ts-ignore
                const allExpenses = await axios.get(`${baseURL}/history/allexpenses`, {
                    headers: {
                        'token': `${localStorage.getItem('token')}`
                    }
                });
                dispatch(showLoading(false));
                dispatch(getExpenses(allExpenses.data.expenses));
            }
        }
    }
};

export const changeExpense = (id: number, name: string, category: any, spent: any, count: any, price: any) => ({type: CHANGE_EXPENSE, id, name, category, spent, count, price});
export const changeExpenseThunkCreator = (id: number, name: string, category: any, spent: any, count: any, price: any) => async (dispatch: any) => {
    dispatch(showLoading(true));

    try {
        dispatch(changeExpense(id, name, category, spent, count, price));

        await historyAPI.changeExpense(id, name, category, spent, count, price);

        dispatch(showLoading(false));
    } catch (e) {
        const token = `${localStorage.getItem('refreshToken')}`;
        if (token) {
            // @ts-ignore
            const response = await axios.post(`${baseURL}/user/token`, {
                token: token
            });
            if (response.data) {
                localStorage.setItem('token', response.data);
                dispatch(userLogin(true));

                // @ts-ignore
                await axios.put(`${baseURL}/history/change`, {id, name, category, spent, count, price}, {
                    headers: {
                        'token': response.data
                    }
                });

                dispatch(showLoading(false));
            }
        }
    }
};

export default historyReducer;