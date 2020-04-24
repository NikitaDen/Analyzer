import * as axios from "axios";


const ADD_EXPENSE = 'ADD_EXPENSE';
const DELETE_EXPENSE = 'DELETE_EXPENSE';
const SET_EXPENSES = 'SET_EXPENSES';
const GET_EXPENSES = 'GET_EXPENSES';
const CHANGE_EXPENSE = 'CHANGE_EXPENSE';

interface Expense {
    name: string,
    category: string,
    spent: string,
    count: string
}

let initialState: any = {
    expenses: [],
};

const historyReducer = (state = initialState, action: any) => {
    switch (action.type) {
        // case ADD_EXPENSE:
        //     return {
        //         ...state,
        //         expenses: [
        //             ...state.expenses,
        //             {
        //                 ...action.expense,
        //                 date: `${new Date().toLocaleString()}`,
        //                 id: Date.now()
        //             },
        //         ]
        //     };
        case ADD_EXPENSE:
            return {
                ...state,
                expenses: [
                    ...state.expenses,
                    {
                        ...action.expense,
                        date: `${new Date().toLocaleString()}`,
                        id: Date.now()
                    },
                ]
            };
        // case DELETE_EXPENSE:
        //     return {
        //         ...state,
        //         expenses: [
        //             ...state.expenses.filter((item: any) => !action.id.includes(item.id))
        //         ]
        //     };
        case DELETE_EXPENSE:
            return {
                ...state,
                expenses: [
                    ...state.expenses.filter((item: any) => !action.id.includes(item.id))
                ]
            };
        case SET_EXPENSES: {
            // localStorage.setItem('expenses', JSON.stringify([...state.expenses]));
            return state;
        }
        // case GET_EXPENSES: {
        //     // @ts-ignore
        //     let expenses: any = JSON.parse(localStorage.getItem('expenses')) || [];
        //     return {
        //         ...state,
        //         expenses: expenses
        //     };
        // }

        case GET_EXPENSES: {
            // @ts-ignore
            // let expenses: any = JSON.parse(localStorage.getItem('expenses')) || [];
            return {
                ...state,
                expenses: [...action.expenses]
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

// export const addExpense = (expense: Expense) => ({type: ADD_EXPENSE, expense});
export const addExpense = (expense: any) => ({type: ADD_EXPENSE, expense});
export const addExpenseThunkCreator = (expense: any) => async (dispatch: any) => {
    // @ts-ignore
    await axios.post('https://analyzerserver.herokuapp.com/api/history/expenses', {
        name: expense.name,
        category: expense.category,
        count: expense.count,
        spent: expense.spent,
        price: expense.price,
        date: `${new Date().toLocaleString()}`,
        id: Date.now(),
    }, {
        withCredentials: true
    });
    dispatch(addExpense(expense));
};

export const deleteExpense = (id: any) => ({type: DELETE_EXPENSE, id});
export const deleteExpensesThunkCreator = (id: any) => async (dispatch: any) => {
    // @ts-ignore
    await axios.put('https://analyzerserver.herokuapp.com/api/history/delete', {id}, {
        withCredentials: true
    });
    dispatch(deleteExpense(id));
};

export const setExpenses = () => ({type: SET_EXPENSES});

// export const getExpenses = () => ({type: GET_EXPENSES});
export const getExpenses = (expenses: any) => ({type: GET_EXPENSES, expenses});
export const getExpensesThunkCreator = () => async (dispatch: any) => {
    // @ts-ignore
    const response = await axios.get('https://analyzerserver.herokuapp.com/api/history/expenses', {
        withCredentials: true
    });
    dispatch(getExpenses(response.data));
};

// export const changeExpense = (id: number, name: string, category: any, spent: any, count: any, price: any) => ({type: CHANGE_EXPENSE, id, name, category, spent, count, price});
export const changeExpense = (id: number, name: string, category: any, spent: any, count: any, price: any) => ({type: CHANGE_EXPENSE, id, name, category, spent, count, price});
export const changeExpenseThunkCreator = (id: number, name: string, category: any, spent: any, count: any, price: any) => async (dispatch: any) => {
    // @ts-ignore
    await axios.put('https://analyzerserver.herokuapp.com/api/history/change',
        {name, category, count, spent, price, id},
        {withCredentials: true});

    dispatch(changeExpense(id, name, category, spent, count, price));
};

export default historyReducer;