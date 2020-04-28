import {settingsAPI} from "../api/api";
import * as axios from "axios";
import {showLoading} from "./account-reducer";

const ADD_CATEGORY = 'ADD_CATEGORY';
const DELETE_CATEGORY = 'DELETE_CATEGORY';
const GET_CATEGORIES = 'GET_CATEGORIES';

let initialState: any = {
    categories: []
};

const settingsReducer = (state = initialState, action: any) => {
    switch (action.type) {
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

export const addCategory = (name: string, id: any) => ({type: ADD_CATEGORY, name, id});
export const addCategoriesThunkCreator = (name: string, id: any) => async (dispatch: any) => {
    dispatch(showLoading(true));
    try {
        dispatch(addCategory(name, id));

        await settingsAPI.addCategory(name, id);

        dispatch(showLoading(false));
    } catch (e) {
        console.log(e.response.data)
    }
};

export const getCategories = (categories: any) => ({type: GET_CATEGORIES, categories});
export const getCategoriesThunkCreator = () => async (dispatch: any) => {
    try {
        // @ts-ignore
        const response = await axios.get('https://analyzerserver.herokuapp.com/api/settings/categories', {
            headers: {
                'token': `${localStorage.getItem('token')}`
            }
        });

        dispatch(getCategories(response.data));
    } catch (e) {
        console.log(e.response.data)
    }
};

export const deleteCategory = (id: string) => ({type: DELETE_CATEGORY, id});
export const deleteCategoryThunkCreator = (id: any) => async (dispatch: any) => {
    dispatch(showLoading(true));

    try {
        dispatch(deleteCategory(id));

        await settingsAPI.deleteExpense(id);

        dispatch(showLoading(false));
    } catch (e) {
        console.log(e.response.body);
    }
};

export default settingsReducer;