import * as axios from "axios";

const instance = axios.create({
    baseURL: 'https://analyzerserver.herokuapp.com/api/',
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
    getExpenses(page = 1, limit = 5) {
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