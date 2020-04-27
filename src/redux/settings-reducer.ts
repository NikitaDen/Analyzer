import {settingsAPI} from "../api/api";

const ADD_CATEGORY = 'ADD_CATEGORY';
const DELETE_CATEGORY = 'DELETE_CATEGORY';
const SET_CATEGORIES = 'SET_CATEGORIES';
const GET_CATEGORIES = 'GET_CATEGORIES';

let initialState: any = {
    categories: []
};

const settingsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_CATEGORIES: {
            return state;
        }
        case GET_CATEGORIES: {
            // @ts-ignore
            return {
                ...state,
                categories: action.categories
            };
        }
        case ADD_CATEGORY: {
            return {
                ...state,
                categories: [
                    ...state.categories,
                    {
                        name: action.name,
                        id: action.id,
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

export const setCategories = () => ({type: SET_CATEGORIES});

export const addCategory = (name: string, id: any) => ({type: ADD_CATEGORY, name, id});
export const addCategoriesThunkCreator = (name: string, id: any) => async (dispatch: any) => {
    try {
        await settingsAPI.addCategory(name, id);
        dispatch(addCategory(name, id));
    } catch (e) {
        console.log(e.response.data)
    }
};

export const getCategories = (categories: any) => ({type: GET_CATEGORIES, categories});
export const getCategoriesThunkCreator = () => async (dispatch: any) => {
    try {
        const response = await settingsAPI.getCategories();

        dispatch(getCategories(response.data));
    } catch (e) {
        console.log(e.response.data)
    }
};

export const deleteCategory = (id: string) => ({type: DELETE_CATEGORY, id});
export const deleteCategoryThunkCreator = (id: any) => async (dispatch: any) => {
    try {
        await settingsAPI.deleteExpense(id);
        dispatch(deleteCategory(id));
    } catch (e) {
        console.log(e.response.body);
    }
};

export default settingsReducer;