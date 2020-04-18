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
        case DELETE_EXPENSE:
            return {
                ...state,
                expenses: [
                    // ...state.expenses.filter((item: any) => item.id !== action.id)
                    ...state.expenses.filter((item: any) => !action.id.includes(item.id))
                ]
            };
        case SET_EXPENSES: {
            localStorage.setItem('expenses', JSON.stringify([...state.expenses]));
            return state;
        }
        case GET_EXPENSES: {
            // @ts-ignore
            let expenses: any = JSON.parse(localStorage.getItem('expenses')) || [];
            return {
                ...state,
                expenses: expenses
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

export const addExpense = (expense: Expense) => ({type: ADD_EXPENSE, expense});
// export const deleteExpense = (id: string) => ({type: DELETE_EXPENSE, id});
export const deleteExpense = (id: any) => ({type: DELETE_EXPENSE, id});
export const setExpenses = () => ({type: SET_EXPENSES});
export const getExpenses = () => ({type: GET_EXPENSES});
export const changeExpense = (id: number, name: string, category: any, spent: any, count: any, price: any) => ({type: CHANGE_EXPENSE, id, name, category, spent, count, price});

export default historyReducer;