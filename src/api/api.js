import axios from "axios";
import {showLoading, userLogin} from "../redux/account-reducer";
import {deleteExpense, getExpenses, getPages} from "../redux/history-reducer";
import {getCategories} from "../redux/settings-reducer";

// export const baseURL = 'http://localhost:5000/api';
export const baseURL = 'https://analyzerserver.herokuapp.com/api';

const instance = axios.create({
    baseURL,
    headers: {
        'token': `${localStorage.getItem('token')}`
    }
});

export const authAPI = {
    register(name, email, password) {
        return instance.post('user/register', {name, email, password});
    },
    logout() {
        return instance.post('user/logout');
    }
};

export const historyAPI = {
    getExpenses(page = 1, limit = 10) {
        return instance.get(`history/expenses?page=${page}&limit=${limit}`);
    },
    addExpense(expense) {
        return instance.post('history/expenses', {
            name: expense.name,
            category: expense.category,
            count: expense.count,
            spent: expense.spent,
            price: expense.price,
            date: `${new Date().toLocaleString()}`,
            id: expense.id,
        });
    },
    changeExpense(id, name, category, spent, count, price) {
        return instance.put('history/change', {id, name, category, spent, count, price});
    },
    deleteExpense(id) {
        return instance.put('history/delete', {id});
    },
};

export const settingsAPI = {
    addCategory(name, id) {
        return instance.post('settings/categories', {name, id});
    },
    deleteExpense(id) {
        return instance.put('settings/delete', {id});
    },
};

export const refreshToken = async (url, payload, method, dispatch, actionCreator) => {
    const token = `${localStorage.getItem('refreshToken')}`;
    if (token) {
        const response = await axios.post(`${baseURL}/user/token`, {
            token: token
        });
        if (response.data) {
            localStorage.setItem('token', response.data);

            if (method !== axios.get) {
                await method(`${baseURL}${url}`, payload, {
                    headers: {
                        'token': response.data
                    }
                });
                if (actionCreator === deleteExpense) {
                    dispatch(deleteExpense(payload.id));
                }
            } else {
                const items = await method(`${baseURL}${url}`, {
                    headers: {
                        'token': response.data
                    }
                });
                if (actionCreator === getExpenses) {
                    dispatch(getExpenses(items.data.expenses));
                    dispatch(getPages(items.data.length));
                } else if (actionCreator === getCategories) {
                    dispatch(getCategories(items.data));
                }
            }

            dispatch(showLoading(false));
        }
    } else {
        dispatch(userLogin(false));
    }
};

