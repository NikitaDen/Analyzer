const ADD_CATEGORY = 'ADD_CATEGORY';
const DELETE_CATEGORY = 'DELETE_CATEGORY';
const SET_CATEGORIES = 'SET_CATEGORIES';
const GET_CATEGORIES = 'GET_CATEGORIES';

let initialState: any = {
    categories: [
        {name: 'Products', id: 1},
        {name: 'Entertainment', id: 2},
        {name: 'Bill', id: 3},
    ]
};

const settingsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_CATEGORIES: {
            localStorage.setItem('categories', JSON.stringify([...state.categories]));
            return state;
        }
        case GET_CATEGORIES: {
            // @ts-ignore
            let categories: any = JSON.parse(localStorage.getItem('categories')) || [
                {name: 'Products', id: 1},
                {name: 'Entertainment', id: 2},
                {name: 'Bill', id: 3},
                {name: 'Clothes', id: 3},
            ];
            return {
                ...state,
                categories: categories
            };
        }
        case ADD_CATEGORY: {
            return {
                ...state,
                categories: [
                    ...state.categories,
                    {
                        name: action.name,
                        id: Date.now(),
                    }
                ]
            };
        }
        case DELETE_CATEGORY: {
            return {
                ...state,
                categories: [
                    ...state.categories.filter((item: any) => item.id !== action.id)
                ]
            };
        }
        default:
            return state;
    }
};

export const addCategory = (name: string) => ({type: ADD_CATEGORY, name});
export const deleteCategory = (id: string) => ({type: DELETE_CATEGORY, id});
export const getCategories = () => ({type: GET_CATEGORIES});
export const setCategories = () => ({type: SET_CATEGORIES});

export default settingsReducer;